import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  CalendarEvent,
  CalendarEventAction, CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject, Subscription } from 'rxjs';
import {
  addHours, addMinutes, isAfter,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
} from 'date-fns';

import { colors } from '../../utils/colors';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { StorageService } from '../../services/storage.service';
import { PreferencesModel } from '../../models/preferences.model';
import { TaskModel } from '../../models/task.model';
import { BDMetaData } from '../../models/bd-metadata.model';

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
  prefs: PreferencesModel = {
    project: '',
    hours: 1,
    task: null as unknown as TaskModel,
    focalPoint: '',
  };

  editAction: CalendarEventAction = {
    label: '<i class="fas fa-fw fa-pencil-alt"></i>',
    a11yLabel: 'Edit',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent('Edited', event);
    },
  };

  deleteAction: CalendarEventAction = {
    label: '<i class="fas fa-fw fa-trash-alt"></i>',
    a11yLabel: 'Delete',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.events = this.events.filter((iEvent) => iEvent !== event);
      this.handleEvent('Deleted', event);
    },
  };

  actions: CalendarEventAction[] = [
    this.editAction,
    this.deleteAction,
  ];

  events: CalendarEvent<BDMetaData>[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly storage: StorageService,
  ) {
  }

  public ngOnInit(): void {
    this.readPrefs();
    this.readEvents();

    const todayEvents = this.events.filter(e => isSameMonth(e.start, this.viewDate) && isSameDay(this.viewDate, e.start));

    if (todayEvents.length === 0) {
      this.activeDayIsOpen = false;
    }

    this.prefsEvent = this.storage.storing$.subscribe(storing => {
      if (storing) {
        this.readPrefs();
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
  }

  private readPrefs(): void {
    const preferences = this.storage.get<PreferencesModel>('preferences');
    if (preferences) {
      this.prefs = preferences;
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const oldDate = this.viewDate;
    this.viewDate = date;
    if (isSameMonth(date, oldDate)) {
      if ((isSameDay(oldDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
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
          meta: this.prefs,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.dialog.open(EventEditorComponent, {
      width: '500px',
      data: { event, action },
    });
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addEvent(date: Date = new Date()): void {
    this.events = [
      {
        title: 'New task',
        start: startOfDay(date),
        end: addHours(date, this.prefs.hours),
        color: colors.blue,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: this.prefs,
      },
      ...this.events,
    ];
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

  public createEvent(): void {
    const event: CalendarEvent = {
      title: 'New task',
      start: this.getLastUsedHour(this.viewDate),
      end: addHours(this.viewDate, this.prefs.hours),
      meta: this.prefs,
    };
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '500px',
      data: { event, action: 'Double click' },
    });
    dialogRef.afterClosed().subscribe((result: CalendarEvent<BDMetaData>) => {
      if (result) {
        result.end = addMinutes(result.start, (result.meta?.hours ?? this.prefs.hours) * 60);
        result = {
          ...result,
          color: colors.blue,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        };
        this.events = [...this.events, result];
        this.storage.set('events', this.events);
        this.createEvent();
      }
    });
  }
}
