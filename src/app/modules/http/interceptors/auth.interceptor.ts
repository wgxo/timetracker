import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

const AuthInfo = {
  username: 'the-coactemalans',
  password: 'idFt24VZSbJWkeWxkoxi',
  client_id: '7ebfcfb581f2451da611edcd8b62706f',
  client_secret: '53cb3fD395A944C5bFf1b3Bc4f82Dc19',
};

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.match(/time-register-api.us-e2.cloudhub.io/)) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: 'Basic ' + btoa(`${AuthInfo.username}:${AuthInfo.password}`),
          client_id: AuthInfo.client_id,
          client_secret: AuthInfo.client_secret,
        },
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
