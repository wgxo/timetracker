import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TimeTrackerService } from '../services/timetracker.service';
import { Category } from '../enums/category.enum';
import { PreferencesModel } from '../models/preferences.model';

@Component({
  template: '',
  styleUrls: [],
})
export class HasFormComponent implements OnInit {
  projects: string[] = [];
  focals: string[] = [];
  tasks: string[] = [];
  categories: string[] = [];

  timeTrackerService: TimeTrackerService;

  form = new FormGroup({
    project: new FormControl(),
    hours: new FormControl(),
    task: new FormControl(),
    category: new FormControl(),
    focalPoint: new FormControl(),
  });

  constructor(
    public injector: Injector,
  ) {
    this.timeTrackerService = injector.get(TimeTrackerService);
  }

  ngOnInit(): void {
    this.timeTrackerService.getProjects().subscribe(p => this.projects = p);
    this.categories = Object.keys(Category)
      .map(key => Category[key as keyof typeof Category]);
  }

  getFocals(project: string): void {
    this.timeTrackerService.getFocalPoints(project)
      .subscribe(f => this.focals = f);
  }

  getTasks(category: string): void {
    this.timeTrackerService.getTasks(category as Category)
      .subscribe(t => this.tasks = t.map(m => m.name));
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
