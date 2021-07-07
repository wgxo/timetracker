import {
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit, ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import {
  MatChipInputEvent,
} from '@angular/material/chips';

import { endOfMonth, startOfMonth } from 'date-fns';
import { CalendarEvent } from 'angular-calendar';

import { EventData } from '../../models/event-data.model';
import { Category } from '../../enums/category.enum';
import { HasFormComponent } from '../has-form.component';
import { BDMetaData } from '../../models/bd-metadata.model';
import { StorageService } from '../../services/storage.service';
import { FavoriteModel } from '../../models/favorite.model';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent extends HasFormComponent implements OnInit {
  favoriteMap = new Map<string, CalendarEvent<BDMetaData>>();
  separatorKeysCodes: number[] = [ENTER];
  favoriteCtrl = new FormControl();

  @ViewChild('favoriteInput') favoriteInput!: ElementRef<HTMLInputElement>;

  constructor(
    public injector: Injector,
    public dialogRef: MatDialogRef<EventEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData,
    private readonly storage: StorageService,
  ) {
    super(injector);

    this.form = new FormGroup({
      ...this.form.controls,
      title: new FormControl(),
      start: new FormControl(),
    });

    const favs = this.storage.get<FavoriteModel[]>('favorites') ?? [];
    favs.forEach(m => this.favoriteMap.set(m.name, m.data));
  }

  get minDate(): Date {
    return startOfMonth(this.data.event.start);
  }

  get maxDate(): Date {
    return endOfMonth(this.data.event.start);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getFocals(this.data.event.meta?.project ?? '');
    this.getTasks(this.data.event.meta?.task?.category as Category);
    this.form.patchValue({
      project: this.data.event.meta?.project,
      hours: this.data.event.meta?.hours,
      task: this.data.event.meta?.task?.name,
      category: this.data.event.meta?.task?.category as Category,
      focalPoint: this.data.event.meta?.focalPoint,
      start: this.data.event.start,
      title: this.data.event.title,
    });
  }

  get favorites(): string[] {
    return [...this.favoriteMap.keys()];
  }

  public submitForm($event: KeyboardEvent | null): void {
    if ($event === null || $event.key === 'Enter') {
      if (this.favoriteCtrl.value) {
        this.saveFavoriteData(this.favoriteCtrl.value);
        this.saveFavorites();
      }

      // send back form values
      this.dialogRef.close({
        ...this.form.value,
        meta: {
          hours: this.form.value.hours,
          project: this.form.value.project,
          focalPoint: this.form.value.focalPoint,
          task: {
            name: this.form.value.task,
            category: this.form.value.category,
          },
        },
      } as CalendarEvent<BDMetaData>);
    }
  }

  public addFavoriteChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.saveFavoriteData(value);

    // Clear the input value
    event.input.value = '';
    this.favoriteCtrl.setValue(null);
  }

  private saveFavoriteData(value: string): void {
    // Add our favorite
    if (value) {
      this.favoriteMap.set(value, {
        ...this.data.event,
        ...this.form.value,
        meta: {
          hours: this.form.value.hours,
          project: this.form.value.project,
          focalPoint: this.form.value.focalPoint,
          task: {
            name: this.form.value.task,
            category: this.form.value.category,
          },
        },
      } as CalendarEvent<BDMetaData>);
      this.saveFavorites();
    }
  }

  private saveFavorites(): void {
    // save favorites
    const favs = this.favorites.map<FavoriteModel>(n => {
      return {
        name: n,
        data: this.favoriteMap.get(n) ?? null as unknown as CalendarEvent<BDMetaData>,
      };
    });

    this.storage.set('favorites', favs);
  }

  public removeFavoriteChip(favorite: string): void {
    this.favoriteMap.delete(favorite);
    this.saveFavorites();
  }

  public loadFavorite(favorite: string): void {
    const newData = this.favoriteMap.get(favorite) ?? null as unknown as CalendarEvent<BDMetaData>;
    if (newData) {
      this.form.patchValue({
        project: newData.meta?.project,
        hours: newData.meta?.hours,
        task: newData.meta?.task?.name,
        category: newData.meta?.task?.category as Category,
        focalPoint: newData.meta?.focalPoint,
        title: newData.title,
      });
    }
  }
}
