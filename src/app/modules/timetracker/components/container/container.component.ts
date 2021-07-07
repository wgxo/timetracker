import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject, Subscription } from 'rxjs';
import {
  addDays,
  addHours,
  addMinutes,
  differenceInSeconds,
  isAfter,
  isSameDay,
  isSameMonth,
  isSaturday,
  nextMonday,
  startOfDay,
} from 'date-fns';

import { colors, EventColor } from '../../utils/colors';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { StorageService } from '../../services/storage.service';
import { PreferencesModel } from '../../models/preferences.model';
import { BDMetaData } from '../../models/bd-metadata.model';
import { Category } from '../../enums/category.enum';
import { EventData } from '../../models/event-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-timetracker-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnDestroy {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen = true;
  refresh: Subject<any> = new Subject();
  prefsEvent = new Subscription();
  prefs: PreferencesModel[] = [{
    project: '',
    hours: 1,
    task: {
      category: Category.OTHER,
      name: 'Other',
    },
    focalPoint: '',
  }];

  editAction: CalendarEventAction = {
    label: 'edit',
    a11yLabel: 'Edit',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent(event);
    },
  };

  deleteAction: CalendarEventAction = {
    label: 'delete_outline',
    a11yLabel: 'Delete',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.deleteEvent(event);
    },
  };

  actions: CalendarEventAction[] = [
    this.editAction,
    this.deleteAction,
  ];

  events: CalendarEvent<BDMetaData>[] = [];
  excludeDays: number[] = [0, 6];
  minHour = 8;
  maxHour = 18;

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly storage: StorageService,
    private readonly snackbar: MatSnackBar,
  ) {
  }

  public ngOnInit(): void {
    this.readPrefs();
    this.readEvents();

    this.prefsEvent = this.storage.storing$.subscribe(storing => {
      if (storing) {
        this.readPrefs();
        this.readEvents();
      }
    });
  }

  public ngOnDestroy(): void {
    this.prefsEvent.unsubscribe();
  }

  private readEvents(): void {
    const evs = this.storage.get<CalendarEvent<BDMetaData>[]>('events');
    if (evs) {
      this.events = evs;
    }

    const todayEvents = this.events.filter(e => isSameMonth(e.start, this.viewDate) && isSameDay(this.viewDate, e.start));

    if (todayEvents.length === 0) {
      this.activeDayIsOpen = false;
    }
  }

  private readPrefs(): void {
    const preferences = this.storage.get<PreferencesModel[]>('preferences');
    if (preferences) {
      this.prefs = preferences;
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const oldDate = this.viewDate;
    this.viewDate = date;

    const els = this.document.querySelectorAll('.cal-month-view .cal-day-cell.cal-in-month .cal-day-number');
    els.forEach(e => {
      if (Number(e.innerHTML) === this.viewDate.getDate()) {
        e.closest('.cal-day-cell')?.classList.add('cal-active');
      } else {
        e.closest('.cal-day-cell')?.classList.remove('cal-active');
      }
    });

    if (isSameMonth(date, oldDate)) {
      this.activeDayIsOpen = !((isSameDay(oldDate, date) && this.activeDayIsOpen) || events.length === 0);
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
          meta: this.prefs[0],
        };
      }
      return iEvent;
    });
    this.handleEvent(event);
  }

  handleEvent(event: CalendarEvent): void {
    event.id = String(Date.now());
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '640px',
      data: {
        event,
        currentHours: this.calcCurrentHours(event.start),
        totalHours: this.calcTotalHours(event.start),
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.end = addMinutes(result.start, (result.meta?.hours ?? this.prefs[0].hours) * 60);
        result = {
          ...result,
          color: this.getColor(result),
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        };
        this.events = this.events.map(e => e.id === result.id ? result : e);
        this.saveEvents();
      }
    });
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.saveEvents();
  }

  public getLastUsedHour(date: Date): Date {
    date.setHours(8, 0, 0);
    let last = date;

    this.events.forEach(e => {
      if (isSameDay(last, e.start) && isAfter(e.end ?? e.start, last)) {
        last = e.end ?? e.start;
      }
    });

    return last;
  }

  public calcNotWorked(date: Date): number {
    let total = 0.0;
    this.events
      .filter(e => isSameMonth(date, e.start) && e.meta?.task.category === Category.ABSENCE)
      .forEach(e => total += Number(e.meta?.hours));

    return total;
  }

  public calcTotalHours(date: Date): number {
    let total = 0.0;
    this.events
      .filter(e => isSameMonth(date, e.start))
      .forEach(e => total += Number(e.meta?.hours));

    return total;
  }

  public calcCurrentHours(date: Date): number {
    let total = 0.0;
    this.events
      .filter(e => isSameDay(date, e.start))
      .forEach(e => total += Number(e.meta?.hours));

    return total;
  }

  public createEvent(): void {
    const event: CalendarEvent = {
      title: 'New task',
      start: this.getLastUsedHour(this.viewDate),
      end: addHours(this.getLastUsedHour(this.viewDate), this.prefs[0].hours),
      meta: this.prefs[0],
    };
    const dialogRef = this.dialog.open<EventEditorComponent, EventData, CalendarEvent<BDMetaData>>(
      EventEditorComponent, {
        width: '640px',
        data: {
          event,
          currentHours: this.calcCurrentHours(this.viewDate),
          totalHours: this.calcTotalHours(this.viewDate),
        },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.end = addMinutes(result.start, (result.meta?.hours ?? this.prefs[0].hours) * 60);
        result = {
          ...result,
          color: this.getColor(result),
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        };
        this.events = [...this.events, result];
        this.saveEvents();

        // move automatically to next day if daily hours are complete
        if (this.calcCurrentHours(this.viewDate) >= 8) {
          let nextDay = startOfDay(addDays(this.viewDate, 1));
          if (isSaturday(nextDay)) {
            nextDay = nextMonday(nextDay);
          }
          this.viewDate = nextDay;
        }
        this.createEvent();
      }
    });
  }

  public getColor(result: CalendarEvent<BDMetaData>): EventColor {
    if (result.meta?.task.category === Category.ABSENCE) {
      return colors.red;
    }

    if (result.meta?.task.category === Category.DEVELOPMENT) {
      return colors.blue;
    }

    return colors.yellow;
  }

  get sortedEvents(): CalendarEvent<BDMetaData>[] {
    return this.events.sort((a, b) => differenceInSeconds(a.start, b.start));
  }

  public saveEvents(showNotification = false): void {
    this.storage.set('events', this.events);
    if (showNotification) {
      this.snackbar.open('The tasks have been saved', 'Dismiss', {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 3000,
      });
    }
  }

  public toggleDays(): void {
    this.excludeDays = this.excludeDays.length > 0 ? [] : [0, 6];
  }

  public sendEvents(): void {
    this.dialog.open(
      ReportComponent, {
        width: '640px',
        data: {
          totalHours: this.calcTotalHours(this.viewDate),
          notWorked: this.calcNotWorked(this.viewDate)
        },
      });
  }
}
