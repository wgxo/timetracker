import { hoursToMinutes } from 'date-fns';

export const formatHours = (hours: number): string => {
  const minutes = hoursToMinutes(hours ?? 0);
  return `${String(Math.floor(minutes / 60))
    .padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}
