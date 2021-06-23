import {
  Component, OnInit,
} from '@angular/core';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth, isSameDay, isSameMonth,
  startOfDay,
  subDays,
} from 'date-fns';
import { colors } from '../../utils/colors';
import {
  CalendarEvent,
  CalendarEventAction, CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { MatDialog } from '@angular/material/dialog';

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

  events: CalendarEvent[] = [
    {
      start: new Date('05/03/2021 08:00'),
      end: addHours(new Date('05/03/2021 08:00'), 0.50),
      title: `CI Sync
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/03/2021 08:00'),
      end: addHours(new Date('05/03/2021 08:00'), 1.00),
      title: `Team dashboarding exercise
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/03/2021 08:00'),
      end: addHours(new Date('05/03/2021 08:00'), 1.00),
      title: `Systems arch weekly - How Pinterest works
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/03/2021 08:00'),
      end: addHours(new Date('05/03/2021 08:00'), 5.50),
      title: `SCM-720 - Update ticket description for SOX audit tickets
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/04/2021 08:00'),
      end: addHours(new Date('05/04/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/04/2021 08:00'),
      end: addHours(new Date('05/04/2021 08:00'), 1.00),
      title: `Dashboarding discussion
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/04/2021 08:00'),
      end: addHours(new Date('05/04/2021 08:00'), 6.50),
      title: `Troubleshoot SOX audit ticket issue
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/05/2021 08:00'),
      end: addHours(new Date('05/05/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/05/2021 08:00'),
      end: addHours(new Date('05/05/2021 08:00'), 4.00),
      title: `OOO
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/05/2021 08:00'),
      end: addHours(new Date('05/05/2021 08:00'), 3.50),
      title: `troubleshoot SOX emergency landing audit tickets
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/06/2021 08:00'),
      end: addHours(new Date('05/06/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/06/2021 08:00'),
      end: addHours(new Date('05/06/2021 08:00'), 0.50),
      title: `EngProd Team meeting
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/06/2021 08:00'),
      end: addHours(new Date('05/06/2021 08:00'), 2.00),
      title: `continued troubleshooting SOX emergency landing audit tickets
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/06/2021 08:00'),
      end: addHours(new Date('05/06/2021 08:00'), 5.00),
      title: `tests with emergency landing tickets
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/07/2021 08:00'),
      end: addHours(new Date('05/07/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/07/2021 08:00'),
      end: addHours(new Date('05/07/2021 08:00'), 1.00),
      title: `EngProd retro
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/07/2021 08:00'),
      end: addHours(new Date('05/07/2021 08:00'), 1.50),
      title: `tested close Jira ticket option in phab UI
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/07/2021 08:00'),
      end: addHours(new Date('05/07/2021 08:00'), 5.00),
      title: `continued performing tests with emergency landing tickets for audit
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/10/2021 08:00'),
      end: addHours(new Date('05/10/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/10/2021 08:00'),
      end: addHours(new Date('05/10/2021 08:00'), 1.00),
      title: `CLR kickoff meeting
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/10/2021 08:00'),
      end: addHours(new Date('05/10/2021 08:00'), 1.00),
      title: `Systems arch weekly - How Pinterest works
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/10/2021 08:00'),
      end: addHours(new Date('05/10/2021 08:00'), 1.00),
      title: `CLR sprint planning
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/10/2021 08:00'),
      end: addHours(new Date('05/10/2021 08:00'), 4.50),
      title: `Github setup user workspace and repo
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/11/2021 08:00'),
      end: addHours(new Date('05/11/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/11/2021 08:00'),
      end: addHours(new Date('05/11/2021 08:00'), 1.50),
      title: `went over kanban dashboard
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/11/2021 08:00'),
      end: addHours(new Date('05/11/2021 08:00'), 6.00),
      title: `started working on CLR-5
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/12/2021 08:00'),
      end: addHours(new Date('05/12/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/12/2021 08:00'),
      end: addHours(new Date('05/12/2021 08:00'), 4.00),
      title: `tested phab db access from Jenkins worker
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/12/2021 08:00'),
      end: addHours(new Date('05/12/2021 08:00'), 3.50),
      title: `CALR-5 - phabricator survey
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/13/2021 08:00'),
      end: addHours(new Date('05/13/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/13/2021 08:00'),
      end: addHours(new Date('05/13/2021 08:00'), 0.50),
      title: `EngProd Team meeting
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/13/2021 08:00'),
      end: addHours(new Date('05/13/2021 08:00'), 1.00),
      title: `EngProd RFC/demo meeting
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/13/2021 08:00'),
      end: addHours(new Date('05/13/2021 08:00'), 1.00),
      title: `Dashboarding excercise
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/13/2021 08:00'),
      end: addHours(new Date('05/13/2021 08:00'), 5.00),
      title: `continue with phabricator survey ticket
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/14/2021 08:00'),
      end: addHours(new Date('05/14/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/14/2021 08:00'),
      end: addHours(new Date('05/14/2021 08:00'), 1.00),
      title: `CALR retro
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/14/2021 08:00'),
      end: addHours(new Date('05/14/2021 08:00'), 2.00),
      title: `troubleshoot phab access from jenkins worker
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/14/2021 08:00'),
      end: addHours(new Date('05/14/2021 08:00'), 4.50),
      title: `continue with phabricator survey queries
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/17/2021 08:00'),
      end: addHours(new Date('05/17/2021 08:00'), 1.00),
      title: `CI Sync
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/17/2021 08:00'),
      end: addHours(new Date('05/17/2021 08:00'), 1.00),
      title: `Systems architecture weekly
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/17/2021 08:00'),
      end: addHours(new Date('05/17/2021 08:00'), 6.00),
      title: `worked on phabricator repo languages survey
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/18/2021 08:00'),
      end: addHours(new Date('05/18/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/18/2021 08:00'),
      end: addHours(new Date('05/18/2021 08:00'), 1.00),
      title: `monthly slack AMA
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/18/2021 08:00'),
      end: addHours(new Date('05/18/2021 08:00'), 6.50),
      title: `continue working on phab repo language survey
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/19/2021 08:00'),
      end: addHours(new Date('05/19/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/19/2021 08:00'),
      end: addHours(new Date('05/19/2021 08:00'), 4.00),
      title: `CALR-16 phab repo languages survey
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/19/2021 08:00'),
      end: addHours(new Date('05/19/2021 08:00'), 3.50),
      title: `played around with cloc and linguist for repository survey
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/20/2021 08:00'),
      end: addHours(new Date('05/20/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/20/2021 08:00'),
      end: addHours(new Date('05/20/2021 08:00'), 0.50),
      title: `EngProd Team meeting
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/20/2021 08:00'),
      end: addHours(new Date('05/20/2021 08:00'), 0.50),
      title: `meeting with Shriman
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/20/2021 08:00'),
      end: addHours(new Date('05/20/2021 08:00'), 6.50),
      title: `continue with phabricator repo languages ticket CALR-16
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/21/2021 08:00'),
      end: addHours(new Date('05/21/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/21/2021 08:00'),
      end: addHours(new Date('05/21/2021 08:00'), 1.00),
      title: `CALR retro
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/21/2021 08:00'),
      end: addHours(new Date('05/21/2021 08:00'), 0.50),
      title: `meeting with Rodrigo
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/21/2021 08:00'),
      end: addHours(new Date('05/21/2021 08:00'), 6.00),
      title: `finishing up CALR-16 and repo languages query
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/24/2021 08:00'),
      end: addHours(new Date('05/24/2021 08:00'), 1.00),
      title: `CLR sprint planning
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/24/2021 08:00'),
      end: addHours(new Date('05/24/2021 08:00'), 0.50),
      title: `meeting with Shriman
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/24/2021 08:00'),
      end: addHours(new Date('05/24/2021 08:00'), 3.00),
      title: `Github admin training
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/24/2021 08:00'),
      end: addHours(new Date('05/24/2021 08:00'), 3.50),
      title: `worked on top repositories report script
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/25/2021 08:00'),
      end: addHours(new Date('05/25/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/25/2021 08:00'),
      end: addHours(new Date('05/25/2021 08:00'), 1.00),
      title: `Infra all hands
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/25/2021 08:00'),
      end: addHours(new Date('05/25/2021 08:00'), 3.00),
      title: `Github admin training
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/25/2021 08:00'),
      end: addHours(new Date('05/25/2021 08:00'), 3.50),
      title: `get top contributors per repository script
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/26/2021 08:00'),
      end: addHours(new Date('05/26/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/26/2021 08:00'),
      end: addHours(new Date('05/26/2021 08:00'), 0.50),
      title: `Werner/Ron sync
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/26/2021 08:00'),
      end: addHours(new Date('05/26/2021 08:00'), 1.00),
      title: `Pinlabs
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/26/2021 08:00'),
      end: addHours(new Date('05/26/2021 08:00'), 1.00),
      title: `Appdoundation forum
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/26/2021 08:00'),
      end: addHours(new Date('05/26/2021 08:00'), 5.00),
      title: `CALR-27 - determine languages used by repos
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/27/2021 08:00'),
      end: addHours(new Date('05/27/2021 08:00'), 0.50),
      title: `standup
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/27/2021 08:00'),
      end: addHours(new Date('05/27/2021 08:00'), 0.50),
      title: `EngProd Team meeting
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/27/2021 08:00'),
      end: addHours(new Date('05/27/2021 08:00'), 7.00),
      title: `CALR-16 - languages per repo reports
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: new Date('05/28/2021 08:00'),
      end: addHours(new Date('05/28/2021 08:00'), 8.00),
      title: `OOO pintentions
<br>Software Development<br>Pinterest - Infrastructure`,
      color: colors.blue,
      actions: this.actions,
    },

  ];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
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

  setView(view: CalendarView): void {
    this.view = view;
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.blue,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

}
