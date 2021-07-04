import { Injectable } from '@angular/core';

import { PROJECTS, TASKS, FOCAL_POINTS } from './mock-timetracker';
import { TaskModel } from '../models/task.model';
import { Category } from '../enums/category.enum';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerServiceMock {
  getTasks = (category: Category): Promise<TaskModel[]> =>
    Promise.resolve(TASKS.filter(t => t.category === category))

  getProjects = (): Promise<string[]> => Promise.resolve(PROJECTS);

  getFocalPoints = (project: string): Promise<string[]> =>
    Promise.resolve(FOCAL_POINTS.map(f => f.project === project ? f.focals : []).flat(1))
}
