import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { PreferencesModel } from '../../models/preferences.model';
import { TimeTrackerService } from '../../services/timetracker.service';
import { Category } from '../../enums/category.enum';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {

  projects: string[] = [];
  focals: string[] = [];
  tasks: string[] = [];
  categories: string[] = [];

  form = new FormGroup({
    project: new FormControl(),
    hours: new FormControl(),
    task: new FormControl(),
    category: new FormControl(),
    focalPoint: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<PreferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PreferencesModel,
    private readonly timeTrackerService: TimeTrackerService,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.timeTrackerService.getProjects().then(p => this.projects = p);
    this.categories = Object.keys(Category)
      .map(key => Category[key as keyof typeof Category]);
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

  getFocals(project: string): void {
    this.timeTrackerService.getFocalPoints(project)
      .then(f => this.focals = f);
  }

  getTasks(category: string): void {
    this.timeTrackerService.getTasks(category as Category)
      .then(t => this.tasks = t.map(m => m.name));
  }

  getPreferencesModel(): PreferencesModel {
    return {
      project: this.form.value.project,
      hours: this.form.value.hours,
      task: {
        category: this.form.value.category as Category,
        name: this.form.value.task,
      },
      focalPoint: this.form.value.focalPoint,
    };
  }
}
