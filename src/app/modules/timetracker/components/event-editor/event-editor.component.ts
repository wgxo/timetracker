import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { endOfMonth, startOfMonth } from 'date-fns';

import { EventData } from '../../models/event-data.model';
import { Category } from '../../enums/category.enum';
import { HasFormComponent } from '../has-form.component';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent extends HasFormComponent implements OnInit {

  constructor(
    public injector: Injector,
    public dialogRef: MatDialogRef<EventEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData,
  ) {
    super(injector);

    this.form = new FormGroup({
      ...this.form.controls,
      title: new FormControl(),
      start: new FormControl(),
    });
  }

  get minDate(): Date {
    return startOfMonth(this.data.event.start);
  }

  get maxDate(): Date {
    return endOfMonth(this.data.event.start);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getFocals(this.data.event.meta?.project ?? '');
    this.getTasks(this.data.event.meta?.task.category as Category);
    this.form.patchValue({
      project: this.data.event.meta?.project,
      hours: this.data.event.meta?.hours,
      task: this.data.event.meta?.task?.name,
      category: this.data.event.meta?.task.category as Category,
      focalPoint: this.data.event.meta?.focalPoint,
      start: this.data.event.start,
      title: this.data.event.title,
    });
  }

  public submitForm($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      this.dialogRef.close(this.data.event);
    }
  }
}
