import {
  Component, OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth, isSameDay, isSameMonth,
  startOfDay,
  subDays,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction, CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';

import { colors } from '../../utils/colors';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { BDMetaData } from '../../models/bd-metadata.model';
import { INITIAL_EVENTS } from '../../utils/initial-events';
import { Category } from '../../enums/category.enum';

@Component({
  selector: 'app-timetracker-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen = true;
  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events = INITIAL_EVENTS.map(e => {
    e.actions = this.actions;
    return e;
  });

  constructor(public dialog: MatDialog) {
    const todayEvents = this.events.filter(e => isSameMonth(e.start, this.viewDate) && isSameDay(this.viewDate, e.start));

    if (todayEvents.length === 0) {
      this.activeDayIsOpen = false;
    }
  }

  ngOnInit(): void {
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
            task: {category: Category.DEVELOPMENT, name: 'Features development'},
            project: 'Customer - Infrastructure',
          },
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '500px',
      data: { event, action },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.data = result;
    // });
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addEvent(date: Date = new Date()): void {
    this.events = [
      {
        title: 'New task',
        start: startOfDay(date),
        end: addHours(date, 1),
        color: colors.blue,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: {
          task: {category: Category.DEVELOPMENT, name: 'Features development'},
          project: 'Customer - Infrastructure',
        },
      },
      ...this.events,
    ];
  }

  public createEvent(): void {
    const event = {
      title: 'New task',
      start: startOfDay(this.viewDate),
      end: addHours(this.viewDate, 1),
      color: colors.yellow,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      meta: {
        task: {category: Category.DEVELOPMENT, name: 'Features development'},
        project: 'Customer - Infrastructure',
      },
    };
    this.events = [event, ...this.events];
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '500px',
      data: { event, action: 'Double click' },
    });
  }
}
