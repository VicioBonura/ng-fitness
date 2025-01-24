import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Booking, BookingRequest } from './booking.model'
import { map, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiService = inject(ApiService);

  getBookings() {
    return this.apiService.get<Booking[]>('bookings', 'Errore nel recupero delle iscrizioni');
  }

  getBooking(id: string) {
    return this.apiService.getById<Booking>(`bookings`, id, 'Errore nel recupero dell\'iscrizione');
  }

  getBookingsAmountByCourseId(courseId: string) {
    return this.getBookings().pipe(
        map(bookings => bookings.reduce((acc, booking) => 
            booking.courseId === courseId ? acc + 1 : acc, 0)
        )
    );
  }

  addBooking(booking: BookingRequest) {
    return this.apiService.post<BookingRequest>('bookings', booking, 'Errore nell\'aggiunta dell\'iscrizione');
  }
}