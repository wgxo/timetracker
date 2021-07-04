import { Injectable } from '@angular/core';

import { TimeTrackerServiceMock } from './timetracker.service.mock';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService extends TimeTrackerServiceMock {

}
