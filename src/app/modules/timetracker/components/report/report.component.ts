import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe, DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  AngularEditorComponent,
  AngularEditorConfig,
} from '@kolkov/angular-editor';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  @ViewChild('editor') editor!: AngularEditorComponent;

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',

    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
      ],
      [
        'link',
        'unlink',
        'customClasses',
        'insertImage',
        'insertVideo',
      ],
    ],

  };

  constructor(
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ReportComponent>,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(MAT_DIALOG_DATA) public data: { totalHours: number, notWorked: number },
  ) {

    this.htmlContent = `<table cellspacing="0" cellpadding="0" dir="ltr" border="1" style="font-family: Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="border:1px solid #ccc;padding:2px 3px;font-weight:bold;text-align:center">Total hours worked</td>
      <td style="border: 1px solid #ccc;padding:2px 3px;font-weight:bold;text-align:center">${this.data.totalHours - this.data.notWorked}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc;padding:2px 3px;font-weight:bold;text-align:center">Total of working hours</td>
      <td style="border: 1px solid #ccc;padding:2px 3px;font-weight:bold;text-align:center">${this.data.totalHours}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc;padding:2px 3px;font-weight:bold;text-align:center">Monthly Fee</td>
      <td style="border: 1px solid #ccc;padding:2px 3px;font-weight:bold;text-align:center">CHANGEME</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc;padding:2px 3px;background-color:rgb(183,183,183);font-weight:bold;text-align:center">Total</td>
      <td style="border: 1px solid #ccc;padding:2px 3px;background-color:rgb(183,183,183);font-weight:bold;text-align:center">CHANGEME</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc;padding:2px 3px;background-color:rgb(207,226,243);font-weight:bold;text-align:center">Currency</td>
      <td style="border: 1px solid #ccc;padding:2px 3px;background-color:rgb(207,226,243);font-weight:bold;text-align:center">USD</td>
    </tr>
  </tbody>
</table>
  `;
  }

  public copyToClipboard(): void {
    const listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/html', this.htmlContent);
      e.preventDefault();
      this.document.removeEventListener('copy', listener);
    };
    this.document.addEventListener('copy', listener);
    this.document.execCommand('copy');

    this.snackBar.open('The report has been copied to the clipboard so you can paste it in your email client', 'Dismiss', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3000,
    });

    this.dialogRef.close();
  }

  public getSubject(): string {
    const d = new Date();
    return encodeURIComponent(`0000 - Full name|Client|${this.datePipe.transform(d, 'MMMM')} ${this.datePipe.transform(d, 'yyyy')}`);
  }

  public sendEmail(): void {
    window.open(`mailto:MANAGER@bairesdev.com;BP-monthlyapprovals@bairesdev.com?subject=${this.getSubject()}&body=${encodeURIComponent(this.editor.textArea.nativeElement.innerText)}&html-body=${encodeURIComponent(this.htmlContent)}`,
      '_blank');
    this.dialogRef.close();
  }
}
