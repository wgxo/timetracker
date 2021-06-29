import {
  Component,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  addHours,
  isSameDay, isSameMonth,
  startOfDay,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction, CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';

import { colors } from '../../utils/colors';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { INITIAL_EVENTS } from '../../utils/initial-events';
import { StorageService } from '../../services/storage.service';
import { PreferencesModel } from '../../models/preferences.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-timetracker-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen = true;
  refresh: Subject<any> = new Subject();
  prefs: PreferencesModel;

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

  events = INITIAL_EVENTS.map(e => {
    e.actions = [];
    return e;
  });

  constructor(
    public dialog: MatDialog,
    private readonly storage: StorageService
    ) {
    const todayEvents = this.events.filter(e => isSameMonth(e.start, this.viewDate) && isSameDay(this.viewDate, e.start));

    if (todayEvents.length === 0) {
      this.activeDayIsOpen = false;
    }

    const preferences = this.storage.get('preferences');
    this.prefs = preferences ? JSON.parse(preferences) as PreferencesModel : {
      project: '',
      hours: 1,
      task: null as unknown as TaskModel,
      focalPoint: '',
    };
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
          meta: {
            task: this.prefs.task,
            project: this.prefs.project,
          },
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
        meta: {
          task: this.prefs.task,
          project: this.prefs.project,
        },
      },
      ...this.events,
    ];
  }

  public createEvent(): void {
    const event = {
      title: 'New task',
      start: startOfDay(this.viewDate),
      end: addHours(this.viewDate, this.prefs.hours),
      color: colors.blue,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      meta: {
        task: this.prefs.task,
        project: this.prefs.project,
      },
    };
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '500px',
      data: { event, action: 'Double click' },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.events = [...this.events, event];
        this.createEvent();
      }
    });
  }
}
