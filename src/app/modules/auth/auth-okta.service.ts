import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { OktaAuth } from '@okta/okta-auth-js';

import { AuthBaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthOktaService implements AuthBaseService {
  private authClient = new OktaAuth({
    issuer: 'https://dev-2103550.okta.com/oauth2/default',
    clientId: '0oa11xnikrjvAgb1F5d7',
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
  }

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string): Promise<void> {
    const transaction = await this.authClient.signIn({ username, password });

    if (transaction.status !== 'SUCCESS') {
      throw Error('We cannot handle the ' + transaction.status + ' status');
    }
    this.isAuthenticated.next(true);

    this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
  }

  async logout(redirect: string): Promise<void> {
    try {
      await this.authClient.signOut();
      this.isAuthenticated.next(false);
      await this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
