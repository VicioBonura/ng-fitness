import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../courses/courses.service';
import { Course } from '../../courses/course.model';

@Component({
  selector: 'app-admin-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-course.component.html',
  styleUrl: './admin-course.component.css'
})
export class AdminCourseComponent implements OnInit {
  // Dependency Injection
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private coursesService = inject(CoursesService);

  // Signals
  course = signal<Course>({
    id: '',
    name: '',
    description: '',
    instructor: '',
    duration: '',
    capacity: 0,
    image: 'http://localhost:3000/images/placeholder.svg'

  });
  isNewCourse = signal<boolean>(false);

  ngOnInit() {
    //sottoscrizione all'url per il recupero dell'id del corso
    const subscription = this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
      
      if(courseId === 'new') {
        //nuovo corso
        this.isNewCourse.set(true);
        this.course.set({
          id: '',
          name: '',
          description: '',
          instructor: '',
          duration: '',
          capacity: 0,
          image: 'http://localhost:3000/images/placeholder.svg'
        });
      } else {
        //modifica corso esistente
        this.isNewCourse.set(false);
        this.loadCourseData(courseId!);
      }
    });
  }

  private loadCourseData(id: string) {
    this.coursesService.getCourse(id).subscribe(course => {
      this.course.set(course);
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isNewCourse()) {
        this.coursesService.createCourse(this.course()).subscribe({
          next: () => this.router.navigate(['/admin/courses']),
          error: (error) => console.error('Errore durante la creazione:', error)
        });
      } else {
        this.coursesService.updateCourse(this.course()).subscribe({
          next: () => this.router.navigate(['/admin/courses']),
          error: (error) => console.error('Errore durante l\'aggiornamento:', error)
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/admin/courses']);
  }
}
