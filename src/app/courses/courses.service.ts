import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Course } from './course.model'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiService = inject(ApiService);

  getCourses() {
    return this.apiService.get<Course[]>('courses', 'Errore nel recupero dei corsi');
  }

  getCourse(id: string) {
    console.log(id);
    return this.apiService.getById<Course>(`courses`, id, 'Errore nel recupero del corso');
  }

  getCourseCapacity(id: string) {
    return this.getCourse(id).pipe(
      map(course => course.capacity)
    );
  }

  createCourse(course: Course) {
    return this.apiService.post('courses', course, 'Errore nella creazione del corso');
  }

  updateCourse(course: Course) {
    return this.apiService.put('courses', course.id,course, 'Errore nella modifica del corso');
  }
}
