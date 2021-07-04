import {
  Component,
  Inject, Injector,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PreferencesModel } from '../../models/preferences.model';
import { Category } from '../../enums/category.enum';
import { HasFormComponent } from '../has-form.component';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent extends HasFormComponent implements OnInit {

  constructor(
    public injector: Injector,
    public dialogRef: MatDialogRef<PreferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PreferencesModel,
  ) {
    super(injector);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getFocals(this.data.project);
    this.getTasks(this.data.task?.category);
    this.form.patchValue({
      project: this.data.project,
      hours: this.data.hours,
      task: this.data.task?.name,
      category: this.data.task?.category as Category,
      focalPoint: this.data.focalPoint,
    });
  }
}
