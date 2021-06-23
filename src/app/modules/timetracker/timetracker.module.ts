import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ContainerComponent } from './components/container/container.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventsComponent } from './components/events/events.component';
import { MatSharedModule } from '../../mat-shared.module';
import { TimeTrackerRoutingModule } from './timetracker-routing.module';
import { EventEditorComponent } from './components/event-editor/event-editor.component';

const SHARED_MODULES = [
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MatSharedModule,
];

@NgModule({
  declarations: [ContainerComponent, NavigatorComponent, CalendarComponent, EventsComponent, EventEditorComponent],
  imports: [
    TimeTrackerRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ...SHARED_MODULES,
  ],
})
export class TimeTrackerModule { }
