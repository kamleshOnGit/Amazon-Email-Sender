import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from '../products.model';
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
  products;
  orders;
  keys;
  records;
  action: string;
  localdata: any;
  selectcheck = false;
  selectcheckemail = false;
  selecttext = 'InActive';


  @ViewChild('csvReader', {static: true}) csvReader: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.localdata = {...data};
    this.action = this.localdata.action;
    this.selectcheck = this.localdata.IsActive;
  }
  doAction() {
    this.dialogRef.close({event: this.action, data: this.localdata});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  updateIsActive() {
    if (this.selectcheck === true) {
      this.localdata.IsActive = 'Yes';
    } else {
      this.localdata.IsActive = 'No';
    }
  }

  uploadListener($event: any): void {
    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        const headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length));
      };

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(',');
      if (curruntRecord.length === headerLength) {
        const csvRecord: Products  = new Products();
        csvRecord.id = curruntRecord[0];
        csvRecord.Brand = curruntRecord[1];
        csvRecord.Action = curruntRecord[2];
        csvRecord.name = curruntRecord[3];
        csvRecord.category = curruntRecord[4];
        csvRecord.Status = curruntRecord[5];
        csvRecord.UniqueKey = curruntRecord[5];
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }
  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }
  isValidHTMLFile(file: any) {
    return file.name.endsWith('.html');
  }
  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    for (const j of headers) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
  uploadListenerHtml($event: any): void {
    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidHTMLFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const htmlData = reader.result;
        // console.log(htmlData);
        this.localdata.emailTemplate = htmlData;
      };

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  updateIsActiveEmail() {
    if (this.selectcheckemail === true) {
      this.selecttext = 'Active';
      this.localdata.status = this.selecttext;
    } else {
      this.selecttext = 'InActive';
      this.localdata.status = this.selecttext;
    }
  }
}
