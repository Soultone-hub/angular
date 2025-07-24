import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CalendarEvent } from '../../models/calendar-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,             
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css']
})
export class EventDetails {
  @Input() event: CalendarEvent| null = null;
  @Output() close = new EventEmitter<void>();

  reservationForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onClose(): void {
    this.close.emit();
  }

  submitReservation(): void {
    if (this.reservationForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    if (this.event) {
    console.log(`Réservation pour l'événement : ${this.event.title}`);
    console.log('Détails du participant :', this.reservationForm.value);
    }
    
    // Après 3 secondes, fermer la modale pour la démonstration
    setTimeout(() => this.onClose(), 3000);
  }
}