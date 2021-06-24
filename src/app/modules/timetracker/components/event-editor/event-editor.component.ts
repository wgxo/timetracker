import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { EventData } from '../../models/event-data.model';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent {

  constructor(
    public dialogRef: MatDialogRef<EventEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData) {}

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: '48px',
    width: '300px',
    minWidth: '0',
    translate: 'yes',
    showToolbar: false,
    placeholder: 'Not set',
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

}
