import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay,
  CalendarView, CalendarEvent,
} from 'angular-calendar';
import { Subject } from 'rxjs';

import { BDMetaData } from '../../models/bd-metadata.model';
import { DialogData, WelcomeComponent } from '../welcome/welcome.component';
import { StorageService } from '../../services/storage.service';
import { hoursToMinutes } from 'date-fns';

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
  @Input() excludeDays: number[] = [0, 6];
  @Input() minHour = 8;
  @Input() maxHour = 17;

  CalendarView = CalendarView;

  constructor(
    private readonly dialog: MatDialog,
    private readonly storage: StorageService,
  ) {
  }

  public openDialog(): void {
    const canShow = this.storage.get<boolean>('showNotifications') ?? true;

    if (canShow) {
      const dialogRef = this.dialog.open<WelcomeComponent, DialogData, boolean>(WelcomeComponent, {
        panelClass: 'popover',
        data: { canShow },
      });
      dialogRef.afterClosed().subscribe(r => {
        this.storage.set('showNotifications', r);
      });
    }
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
    this.openDialog();
  }

  public doAction(event: CalendarEvent, action: CalendarEventAction): void {
    action.onClick({ event, sourceEvent: null as unknown as MouseEvent });
  }

  public formatHours(event: CalendarEvent<BDMetaData>): string {
    const mins = hoursToMinutes(event.meta?.hours ?? 0);
    return `${String(Math.floor(mins / 60))
      .padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  }
}
