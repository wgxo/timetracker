import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { AuthBaseService } from './base.service';
import { StorageService } from '../timetracker/services/storage.service';
import { API_URL } from '../http/api.config';
import { first, map } from 'rxjs/operators';

export interface LoginModel {
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthMuleService implements AuthBaseService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  baseUrl = API_URL;

  constructor(
    private readonly router: Router,
    private readonly storage: StorageService,
    private readonly http: HttpClient,
  ) {
  }

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = this.storage.get('USER_TOKEN') !== null;
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string): Promise<void> {
    const result = await this.http.post<LoginModel>(`${this.baseUrl}/login`, {
      username,
      password,
    }, {
      observe: 'response',
      responseType: 'json',
    }).pipe(first(), map(r => r)).toPromise();

    if (result.status !== 201 || !result.body) {
      throw new Error('Unable to authenticate user');
    }

    this.isAuthenticated.next(true);
    this.storage.set('USER_TOKEN', 'username');
    await this.router.navigate(['/timetracker']);
  }

  async logout(redirect: string): Promise<void> {
    try {
      this.storage.set('USER_TOKEN', null);
      this.isAuthenticated.next(false);
      await this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
