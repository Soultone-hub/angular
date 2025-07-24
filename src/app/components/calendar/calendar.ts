import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from '../../models/calendar-event';
import { CommonModule } from '@angular/common'; 


// Pour typer les cellules de notre calendrier
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,             
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class Calendar implements OnInit, OnChanges {
  @Input() viewDate: Date = new Date();
  @Input() events: CalendarEvent[] = [];
  @Output() eventClicked = new EventEmitter<CalendarEvent>();

  days: (CalendarDay | null)[] = [];
  weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  ngOnInit(): void {
    this.generateCalendar();
  }

  // Se déclenche à chaque fois qu'une donnée @Input change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['viewDate'] || changes['events']) {
      this.generateCalendar();
    }
  }

  generateCalendar(): void {
    this.days = [];
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 pour Dimanche, 1 pour Lundi...
    const numDaysInMonth = lastDayOfMonth.getDate();

    // Ajouter les jours "vides" du mois précédent
    for (let i = 0; i < startDayOfWeek; i++) {
      this.days.push(null); 
    }

    //  Ajouter les jours du mois actuel
    for (let day = 1; day <= numDaysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();

      // Filtre les événements pour ce jour spécifique
      const eventsForDay = this.events.filter(event =>
        event.start.getFullYear() === date.getFullYear() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getDate() === date.getDate()
      );

      this.days.push({
        date: date,
        isCurrentMonth: true,
        isToday: date.setHours(0,0,0,0) === today.setHours(0,0,0,0),
        events: eventsForDay
      });
    }
  }

  onEventClick(event: CalendarEvent, domEvent: MouseEvent): void {
    domEvent.stopPropagation(); // Empêche de déclencher un clic sur la journée
    this.eventClicked.emit(event);
  }
}