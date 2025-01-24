import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CourseComponent } from '../courses/course/course.component';
import { Course } from '../courses/course.model';
import { CoursesService } from '../courses/courses.service';
import { BookingService } from '../booking/booking.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CourseComponent, RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  courses = signal<Course[] | undefined>(undefined);
  bookingStats = signal<{[key: string]: number}>({});
  isFetching = signal<boolean>(false);

  private coursesService = inject(CoursesService);
  private bookingService = inject(BookingService);

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.isFetching.set(true);
    // Carica corsi e statistiche prenotazioni
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        // Per ogni corso, carica il numero di prenotazioni
        courses.forEach(course => {
          this.bookingService.getBookingsAmountByCourseId(course.id)
            .subscribe(amount => {
              this.bookingStats.update(stats => ({
                ...stats,
                [course.id]: amount
              }));
            });
        });
      },
      complete: () => this.isFetching.set(false)
    });
  }
}
