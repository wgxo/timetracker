import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { BDMetaData } from '../../models/bd-metadata.model';
import { isSameMonth } from 'date-fns';

@Component({
  selector: 'app-time-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  @Input() events: CalendarEvent<BDMetaData>[] = [];
  @Input() refresh = new Subject<any>();
  @Input() viewDate: Date = new Date();
  @Output() addEvent = new EventEmitter();
  @Output() sendEvent = new EventEmitter();
  @Output() saveEvents = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<CalendarEvent<BDMetaData>>();

  get totalHours(): number {
    let total = 0;
    this.events.forEach(e => total += this.sameMonth(e) ? Number(this.calcDuration(e)) : 0);

    return total;
  }

  public calcDuration(event: CalendarEvent<BDMetaData>): string {
    if (event && event.end && event.start) {
      return String(((event.end.getTime() - event.start.getTime()) / 1000 / 3600).toFixed(2));
    }

    return '0';
  }

  public sameMonth(event: CalendarEvent<BDMetaData>): boolean {
    return isSameMonth(this.viewDate, event.start);
  }
}
