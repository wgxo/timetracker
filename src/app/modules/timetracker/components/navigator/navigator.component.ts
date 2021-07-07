import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { LabelType, Options } from '@angular-slider/ngx-slider';
import { CalendarView } from 'angular-calendar';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements AfterViewInit {
  @Input() view: CalendarView = CalendarView.Month;
  @Input() viewDate: Date = new Date();
  @Input() locale = 'en';
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();
  @Output() toggleDays = new EventEmitter();

  @Input() minHour = 8;
  @Input() maxHour = 17;
  @Output() minHourChange = new EventEmitter<number>();
  @Output() maxHourChange = new EventEmitter<number>();

  public CalendarView = CalendarView;

  options: Options = {
    floor: 0,
    ceil: 23,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>From:</b> ' + this.toHour(value);
        case LabelType.High:
          return '<b>To:</b> ' + this.toHour(value);
        default:
          return this.toHour(value);
      }
    },
  };

  constructor(
    private readonly ref: ElementRef,
    private readonly datePipe: DatePipe,
  ) {
  }

  public toHour(value: number): string {
    const d = new Date();
    d.setHours(value);
    return this.datePipe.transform(d, 'ha') ?? String(value);
  }

  @HostListener('window:resize')
  public onResize(): void {
    const direction = this.ref.nativeElement.querySelector('.nav-container > div')?.style.flexDirection;

    // change view to Day when the screen is small
    if (direction === 'column' && this.view !== CalendarView.Day) {
      this.changeView(CalendarView.Day);
    }
  }

  public changeView(what: CalendarView): void {
    this.viewChange.emit(what);
  }

  ngAfterViewInit(): void {
    interval(500)
      .pipe(first())
      .subscribe(() => {
        this.onResize();
      });
  }
}
