import { Component, input } from '@angular/core';
import { Course } from '../course.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  course = input.required<Course>();
}