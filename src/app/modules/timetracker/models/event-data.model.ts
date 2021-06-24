import { CalendarEvent } from 'angular-calendar';

import { BDMetaData } from './bd-metadata.model';

export interface EventData {
  action: string;
  event: CalendarEvent<BDMetaData>;
}
