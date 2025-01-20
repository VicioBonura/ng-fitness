import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'bookings', component: BookingsComponent},
    {path: 'admin', component: AdminComponent},
    {path: '**', redirectTo: 'not-found'}
];
