import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  CalendarEvent,
  CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() events: CalendarEvent[] = [];
  @Input() actions: CalendarEventAction[] = [];
  @Input() view: CalendarView = CalendarView.Month;
  @Input() viewDate: Date = new Date();
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();
  @Input() activeDayIsOpen = false;
  @Input() refresh = new Subject<any>();
  @Output() dayClicked = new EventEmitter<CalendarMonthViewDay>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() eventTimesChanged = new EventEmitter<CalendarEventTimesChangedEvent>();

  CalendarView = CalendarView;
}
