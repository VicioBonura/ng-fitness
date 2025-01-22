import { Component, OnInit, signal, inject, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { Course } from './course.model';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseComponent, RouterOutlet],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses = signal<Course[] | undefined>(undefined);
  isFetching = signal<boolean>(false);

  private coursesService = inject(CoursesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.coursesService.getCourses()
      .subscribe({
        next: (resData) => {
          this.courses.set(resData);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('fetch corsi completo');
          this.isFetching.set(false);
        }
      });
    this.destroyRef.onDestroy(() => {
      console.log('destroy');
      subscription.unsubscribe();
    });
  }
}
