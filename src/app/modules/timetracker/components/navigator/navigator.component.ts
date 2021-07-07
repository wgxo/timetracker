import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { CalendarView } from 'angular-calendar';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';

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

  public CalendarView = CalendarView;

  constructor(
    private readonly ref: ElementRef,
  ) {
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
