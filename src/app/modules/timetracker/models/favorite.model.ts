import { CalendarEvent } from 'angular-calendar';
import { BDMetaData } from './bd-metadata.model';

export interface FavoriteModel {
  name: string;
  data: CalendarEvent<BDMetaData>;
}
