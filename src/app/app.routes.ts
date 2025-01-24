import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCourseComponent } from './admin/admin-course/admin-course.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'courses', component: CoursesComponent, children: [
        {path: ':courseId', component: CourseDetailComponent}
    ]},
    {path: 'admin', component: AdminComponent, children: [
        {path: ':courseId', component: AdminCourseComponent},
        {path: 'new', component: AdminCourseComponent}
    ]},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'not-found'}
];
