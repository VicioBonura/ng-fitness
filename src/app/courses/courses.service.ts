import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Course } from './course.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiService = inject(ApiService);

  getCourses() {
    return this.apiService.get<Course[]>('courses', 'Errore nel recupero dei corsi');
  }

  getCourse(id: string) {
    return this.apiService.getById<Course>(`courses`, id, 'Errore nel recupero del corso');
  }
}
