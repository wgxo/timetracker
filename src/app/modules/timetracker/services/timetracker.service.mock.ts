import { Injectable } from '@angular/core';

import { PROJECTS, TASKS, FOCAL_POINTS } from './mock-timetracker';
import { TaskModel } from '../models/task.model';
import { Category } from '../enums/category.enum';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerServiceMock {
  getTasks = (category: Category): Observable<TaskModel[]> =>
    of(TASKS.filter(t => t.category === category))

  getProjects = (): Observable<string[]> => of(PROJECTS);

  getFocalPoints = (project: string): Observable<string[]> =>
   of(FOCAL_POINTS.map(f => f.project === project ? f.focals : []).flat(1))
}
