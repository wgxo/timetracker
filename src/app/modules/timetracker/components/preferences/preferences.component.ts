import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { PreferencesModel } from '../../models/preferences.model';
import { Category } from '../../enums/category.enum';
import { TimeTrackerService } from '../../services/timetracker.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  selected = 0;
  tabs: string[] = [];
  form: FormGroup[] = [];

  constructor(
    public dialogRef: MatDialogRef<PreferencesComponent>,
    public timeTrackerService: TimeTrackerService,
    @Inject(MAT_DIALOG_DATA) public data: PreferencesModel[],
  ) {
    this.tabs = this.data.map((m, i) => `${m.project}${i === 0 ? ' (default)' : ''}`);
  }

  getPreferencesModel(): PreferencesModel[] {
    return this.form.map<PreferencesModel>(f => {
      return {
        project: f.value.project,
        hours: f.value.hours,
        task: {
          category: f.value.category as Category,
          name: f.value.task,
        },
        focalPoint: f.value.focalPoint,
      };
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public getCategories(): string[] {
    return Object.keys(Category)
      .map(key => Category[key as keyof typeof Category]);
  }

  ngOnInit(): void {
    this.data.forEach((d, i) => {
      this.form.push(new FormGroup({
        project: new FormControl(),
        hours: new FormControl(),
        task: new FormControl(),
        category: new FormControl(),
        focalPoint: new FormControl(),
      }));
      this.form[i].patchValue({
        project: d.project,
        hours: d.hours,
        task: d.task?.name,
        category: d.task?.category as Category,
        focalPoint: d.focalPoint,
      });
    });
  }

  public addTab(): void {
    this.tabs.push('New project');
    this.selected = this.tabs.length - 1;
    this.form.push(new FormGroup({
      project: new FormControl(),
      hours: new FormControl(),
      task: new FormControl(),
      category: new FormControl(),
      focalPoint: new FormControl(),
    }));
  }

  public removeTab(index: number): void {
    this.tabs.splice(index, 1);
    this.form.splice(index, 1);
  }
}
