import {
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

import { AuthService } from './modules/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesComponent } from './modules/timetracker/components/preferences/preferences.component';
import { PreferencesModel } from './modules/timetracker/models/preferences.model';
import { StorageService } from './modules/timetracker/services/storage.service';
import { TaskModel } from './modules/timetracker/models/task.model';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TimeTracker';
  isAuthenticated = false;
  toggleControl = new FormControl(false);
  prefsEvent: Subscription;
  prefs: PreferencesModel = {
    project: '',
    hours: 1,
    task: null as unknown as TaskModel,
    focalPoint: '',
  };

  @HostBinding('class') className = '';

  constructor(public authService: AuthService,
              private overlay: OverlayContainer,
              @Inject(DOCUMENT) private readonly document: Document,
              public dialog: MatDialog,
              private storage: StorageService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      },
    );

    this.readPrefs();

    this.prefsEvent = this.storage.storing$.subscribe(storing => {
      if (storing) {
        this.readPrefs();
      }
    });
  }

  public ngOnDestroy(): void {
    this.prefsEvent.unsubscribe();
  }

  private readPrefs(): void {
    const preferences = this.storage.get<PreferencesModel>('preferences');
    if (preferences) {
      this.prefs = preferences;
    }
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      const body = this.document.getElementsByTagName('body')[0];
      if (darkMode) {
        body.classList.add(darkClassName);
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        body.classList.remove(darkClassName);
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });

    if (this.storage.get('preferences') === null) {
      this.openPrefs();
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout('/');
  }

  isPreferencesModel(object: any): object is PreferencesModel {
    return object && 'project' in object && 'hours' in object &&
      'task' in object && 'focalPoint' in object;
  }

  openPrefs(): void {
    const dialogRef = this.dialog.open(PreferencesComponent, {
      width: '500px',
      data: this.prefs,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isPreferencesModel(result)) {
        this.prefs = result;
        this.storage.set('preferences', result);
      }
    });
  }
}
