import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import {
  CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay,
  CalendarView, CalendarEvent,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { MtxPopover, MtxPopoverTrigger } from '@ng-matero/extensions';

import { BDMetaData } from '../../models/bd-metadata.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit {
  @Input() events: CalendarEvent[] = [];
  @Input() actions: CalendarEventAction[] = [];
  @Input() view: CalendarView = CalendarView.Month;
  @Input() viewDate: Date = new Date();
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();
  @Input() activeDayIsOpen = false;
  @Input() refresh = new Subject<any>();
  @Output() doubleClick = new EventEmitter();
  @Output() dayClicked = new EventEmitter<CalendarMonthViewDay>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() eventTimesChanged = new EventEmitter<CalendarEventTimesChangedEvent>();

  @ViewChild('popoverTrigger2') trigger!: MtxPopoverTrigger;
  @ViewChild('popover2') popover!: MtxPopover;

  CalendarView = CalendarView;

  constructor(private readonly ref: ElementRef) {
  }

  calcDuration(event: CalendarEvent<BDMetaData>): string {
    if (event && event.end && event.start) {
      return String(((event.end.getTime() - event.start.getTime()) / 1000 / 3600).toFixed(2));
    }

    return '0';
  }

  totalHours(events: CalendarEvent[]): number {
    let total = 0;
    events.forEach(e => total += Number(this.calcDuration(e)));

    return total;
  }

  public ngAfterViewInit(): void {
    this.popover.xOffset = (this.ref.nativeElement.clientWidth / 2) - 200;
    this.trigger.openPopover();
  }

  public closePopup(): void {
    this.trigger.closePopover();
  }
}
