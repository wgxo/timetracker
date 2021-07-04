import { TaskModel } from './task.model';

export class BDMetaData {
  project = '';
  focalPoint = '';
  task = null as unknown as TaskModel;
  hours = 0.0;
}
