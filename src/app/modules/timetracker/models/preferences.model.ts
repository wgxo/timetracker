import { TaskModel } from './task.model';

export interface PreferencesModel {
  project: string;
  focalPoint: string;
  hours: number;
  task: TaskModel;
}
