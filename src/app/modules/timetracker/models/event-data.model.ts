import { CalendarEvent } from 'angular-calendar';

import { BDMetaData } from './bd-metadata.model';

export interface EventData {
  totalHours: number;
  currentHours: number;
  event: CalendarEvent<BDMetaData>;
}
