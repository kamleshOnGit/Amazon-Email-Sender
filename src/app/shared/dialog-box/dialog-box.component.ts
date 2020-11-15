import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  id: number;
  Action: string;
  name: string;
  category: string;
  IsActive: string;
  UniqueKey: string;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  action: string;
  localdata: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.localdata = {...data};
    this.action = this.localdata.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localdata});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}