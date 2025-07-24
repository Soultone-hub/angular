import { Injectable } from '@angular/core';
// "Observable" et "of" sont importés de RxJS pour gérer les flux de données c'est a dire des attente de reponse d'api
import { Observable, of } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event';

@Injectable({
  // Le service est injectable dans toute l'application
  providedIn: 'root'
})
export class Event{

  private events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Conférence sur Angular',
      start: new Date(), // Aujourd'hui
      description: 'Découvrez les nouveautés de la dernière version d\'Angular.',
      color: '#1e90ff'
    },
    {
      id: 2,
      title: 'Atelier TypeScript',
      // Dans 3 jours
      start: new Date(new Date().setDate(new Date().getDate() + 3)),
      description: 'Un atelier pratique pour maîtriser TypeScript.',
      color: '#ff6347'
    },
    {
      id: 3,
      title: 'Meetup Développement Durable',
      // Le 15 du mois prochain
      start: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15),
      description: 'Comment la tech peut aider la planète.',
      color: '#32cd32'
    }
  ];

  constructor() { }

  getEvents(): Observable<CalendarEvent[]> {
    
    return of(this.events);
  }
}