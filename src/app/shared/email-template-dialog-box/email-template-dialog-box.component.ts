import { Component, OnInit , Inject, Optional ,ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailEditorComponent } from 'angular-email-editor';
import sample from './sample.json';

export interface UsersData {
  id: number;
  Action: string;
  name: string;
  category: string;
  IsActive: string;
  UniqueKey: string;
}


@Component({
  selector: 'app-email-template-dialog-box',
  templateUrl: './email-template-dialog-box.component.html',
  styleUrls: ['./email-template-dialog-box.component.scss']
})
export class EmailTemplateDialogBoxComponent implements OnInit {
  title = 'angular-email-editor';
  constructor(
    public dialogRef: MatDialogRef<EmailTemplateDialogBoxComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
  }
  @ViewChild(EmailEditorComponent , {static: true})
  private emailEditor: EmailEditorComponent;


  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  editorLoaded() {
    // load the design json here
    this.emailEditor.loadDesign(sample);
  }

  exportHtml() {
    this.emailEditor.exportHtml((data) => console.log('exportHtml', data));
  }

}
