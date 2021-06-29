import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
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
