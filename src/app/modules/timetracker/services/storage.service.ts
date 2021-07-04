import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  public storing$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.storing$.next(true);
    } catch (e) {
    }
  }

  get(key: string): string | null {
    try {
      return JSON.parse(localStorage.getItem(key) as string);
    } catch (e) {
      return null;
    }
  }
}
