import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesComponent } from './modules/timetracker/components/preferences/preferences.component';
import { PreferencesModel } from './modules/timetracker/models/preferences.model';
import { StorageService } from './modules/timetracker/services/storage.service';
import { TaskModel } from './modules/timetracker/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TimeTracker';
  isAuthenticated = false;
  toggleControl = new FormControl(false);
  data: PreferencesModel;

  @HostBinding('class') className = '';

  constructor(public authService: AuthService,
              private overlay: OverlayContainer,
              public dialog: MatDialog,
              private storage: StorageService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated,
    );
    const preferences = this.storage.get('preferences');
    this.data = preferences ? JSON.parse(preferences) as PreferencesModel : {
      project: '',
      hours: 1,
      task: null as unknown as TaskModel,
      focalPoint: '',
    };
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
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
      data: this.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isPreferencesModel(result)) {
        this.data = result;
        this.storage.set('preferences', JSON.stringify(result));
      }
    });
  }
}
