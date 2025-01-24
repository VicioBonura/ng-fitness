import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { BookingService } from '../../booking/booking.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  //dependency injections
  private route = inject(ActivatedRoute);
  private courseService = inject(CoursesService);
  private bookingService = inject(BookingService);
  private destroyRef = inject(DestroyRef);

  //signals
  course = signal<Course | undefined>(undefined);
  courseAvailability = signal<number>(0);
  isFetching = signal<boolean>(false);
  isAvailable = signal<boolean>(false);

  ngOnInit() {
    //sottoscrizione all'url per il recupero dell'id del corso
    const subscription = this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
      if(courseId) {
        this.isFetching.set(true);
        //recupero dati corso
        this.courseService.getCourse(courseId)
          .subscribe({
            next: (resData) => {
              //calcolo disponibilità
              const courseCapacity = resData.capacity;
              this.bookingService.getBookingsAmountByCourseId(courseId)
                .subscribe(amount => {
                  const availability = courseCapacity - amount;
                  this.courseAvailability.set(availability);
                  this.isAvailable.set(availability > 0);
                });
              this.course.set(resData);
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {
              this.isFetching.set(false);
            }
          });
      }
    });
  
    //pulizia sottoscrizione
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  //modello dati del form
  formData = {
    courseId: '',
    nomeUtente: ''
  };

  onSubmit() {
  //controllo esistenza dati
  const courseId = this.course()?.id;
  const userName = this.formData.nomeUtente;
  if(!courseId || !userName) {
    console.error('dati mancanti');
    return;
  }
    
  //controllo disponibilità
  this.bookingService.getBookingsAmountByCourseId(courseId)
    .subscribe({
      next: (currentBookings) => {
        const courseCapacity = this.course()?.capacity || 0;
        const availability = courseCapacity - currentBookings;

        if (availability <= 0) {
          console.error('Corso pieno');
          return;
        }

        //registrazione iscrizione
        this.bookingService.addBooking({ courseId, userName })
          .subscribe({
            next: (resData) => {
              //aggiornamento disponibilità
              const newAvailability = availability - 1;
              this.courseAvailability.set(newAvailability);
              this.isAvailable.set(newAvailability > 0);
              console.log('Iscrizione completata', resData);

              //reset del form
              this.formData.nomeUtente = '';
            },
            error: (error) => {
              console.error('Errore durante l\'iscrizione', error);
            }
          });
      },
      error: (error) => {
          console.error('Errore nel controllo disponibilità', error);
        }
      });
    }
}
