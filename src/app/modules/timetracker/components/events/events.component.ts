import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-time-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  @Output() addEvent = new EventEmitter<string>();
  @Input() events: CalendarEvent[] = [];
  @Input() refresh = new Subject<any>();
  @Output() deleteEvent = new EventEmitter<CalendarEvent>();

  calcDuration(event: CalendarEvent<any>): string {
    if (event && event.end && event.start) {
      return String(((event.end.getTime() - event.start.getTime()) / 1000 / 3600).toFixed(2));
    }

    return '0';
  }
}
