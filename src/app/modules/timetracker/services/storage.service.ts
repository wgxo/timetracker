import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  public storing$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  clear(): void {
    try {
      localStorage.clear();
      this.storing$.next(true);
    } catch (e) {
    }
  }

  del(key: string): void {
    try {
      localStorage.removeItem(key);
      this.storing$.next(true);
    } catch (e) {
    }
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.storing$.next(true);
    } catch (e) {
    }
  }

  get<Type>(key: string): Type {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    try {
      return JSON.parse(localStorage.getItem(key) ?? '', (k, value) => {
        if (typeof value === 'string' && dateFormat.test(value)) {
          return new Date(value);
        }

        return value;
      }) as Type;
    } catch (e) {
      return null as unknown as Type;
    }
  }
}
