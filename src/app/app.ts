import { Component, OnInit } from '@angular/core';
import { Event } from './services/event';
import { CalendarEvent } from './models/calendar-event';
import { Calendar } from './components/calendar/calendar';
import { EventDetails } from './components/event-details/event-details';
import { DatePipe , CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventDetails, Calendar, DatePipe, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  viewDate: Date = new Date();
  allEvents: CalendarEvent[] = [];
  selectedEvent: CalendarEvent | null = null;

  constructor(private event: Event) {}

  ngOnInit(): void {
    this.event.getEvents().subscribe(events => {
      this.allEvents = events;
    });
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  today(): void {
    this.viewDate = new Date();
  }

  handleEventClicked(event: CalendarEvent): void {
    this.selectedEvent = event;
  }

  closeDetailsModal(): void {
    this.selectedEvent = null;
  }
}