import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from '../products.model';
import { ProductKeys } from '../uniqueKeys.model';
import { Orders } from '../orders.model';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatSelectChange } from '@angular/material/select';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface UsersData {
  itemName: string;
  ProductId: string;
  sellerSku: string;
  status: string;
  price: string;
  quantity: string;
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
  productsAll = [];
  productnotfound = [];
  errortext = 'Unknow Error';

  @ViewChild('csvReader', { static: true }) csvReader: any;
  logoImage: any;

  constructor(private repoService: RepositoryService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private http: HttpClient,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.localdata = { ...data };
    this.localdata.message = this.localdata.message !== undefined ? this.localdata.message : this.errortext;
    console.log(this.localdata);
    this.action = this.localdata.action;
    this.selectcheck = this.localdata.IsActive;
    // this.repoService.getData('products').subscribe((res: any) => {
    //   this.productsAll = res.data.data;
    // });
  }
  doAction() {

    if (this.logoImage !== null && this.logoImage !== undefined) {
      this.localdata['logo'] = this.logoImage
    }
    this.dialogRef.close({ event: this.action, data: this.localdata });
  }

  // public getadminsettings(id: string) {
  //   this.repoService.getData('getSetting')
  // }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
    window.location.reload();
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
        this.localdata = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
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


  uploadListenerOrders($event: any): void {
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
        // this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.localdata = this.getDataRecordsArrayOrdersFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.getDataRecordsArrayOrdersFromCSVFile(csvRecordsArray, headersRow.length));
      };

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  async loadproduct() {
    this.repoService.getData('products').subscribe((res: any) => {
      this.productsAll = res.data.data;
    });
  }
  async uploadListenerKeys($event: any) {
    await this.loadproduct();

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
        // this.records = this.getDataRecordsKeysArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.localdata = this.getDataRecordsKeysArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.localdata.productnotfound = [this.productnotfound];
        console.log(this.getDataRecordsKeysArrayFromCSVFile(csvRecordsArray, headersRow.length));
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
      let csv;
      // if ((csvRecordsArray[i] as string) && csvRecordsArray[i].startsWith("\"")) {
      //   csv = (csvRecordsArray[i] as string).replace(/,/, '');
      // } else {
      // }
      csv = csvRecordsArray[i]
      var curruntRecord = (csv as string).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      // for (var j = 0; j < arr.length; j++){
      //   console.log('arr['+i+'] =',arr[i]);
      // } 
      // const curruntRecord = (csv as string).split(',');
      if (curruntRecord.length === headerLength) {
        const csvRecord: UsersData = new Products();
        csvRecord.itemName = curruntRecord[0];
        csvRecord.ProductId = curruntRecord[22];
        csvRecord.sellerSku = curruntRecord[3];
        csvRecord.price = curruntRecord[4];
        csvRecord.status = curruntRecord[28];
        csvRecord.quantity = +curruntRecord[5] > 0 ? curruntRecord[5] : '1';
        csvArr.push(csvRecord);
      }
      else {
        console.log(curruntRecord)
      }
    }
    return csvArr;
  }


  getDataRecordsArrayOrdersFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(',');
      if (curruntRecord.length === headerLength) {
        const csvRecord: Orders = new Orders();
        csvRecord.orderId = curruntRecord[0];
        csvRecord.orderItemId = curruntRecord[1];
        // csvRecord.paymentsDate = curruntRecord[3];
        csvRecord.buyerEmail = curruntRecord[4];
        csvRecord.buyerName = curruntRecord[5];
        csvRecord.buyerPhoneNumber = curruntRecord[6];
        csvRecord.sku = curruntRecord[7];
        csvRecord.productName = curruntRecord[8];
        csvRecord.quantityPurchased = curruntRecord[9];
        csvRecord.shipPhoneNumber = +curruntRecord[24];
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }



  getDataRecordsKeysArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(',');
      if (curruntRecord.length === headerLength) {
        const csvRecord: ProductKeys = new ProductKeys();
        // for (let j = 0; j < this.productsAll.length; j++) {
        if (curruntRecord[1] !== '') {
          if (this.productsAll.filter(x => x.marketPlaceProductId == curruntRecord[0]).length > 0) {
            csvRecord.key = curruntRecord[1];
            csvRecord.status = curruntRecord[2];
            csvRecord.priority = 'High';
            csvRecord.sku = curruntRecord[0];
            csvArr.push(csvRecord);
          } else {
            this.productnotfound.push(curruntRecord[0]);
          }
        }
        // }
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

  public selectedValue(event: MatSelectChange) {
    this.localdata.batch = event.value.batch;
    this.selectcheckemail = true;
    this.updateIsActiveEmail();
    this.localdata.id = event.value.id;
    this.localdata.priority = event.value.priority;
    console.log(event.value);
  }
  selectLogo(event) {
    if (event && event.target.files && event.target.files.length > 0) {
      this.imageupload(event.target.files[0])
    }
  }
  imageupload(event) {
    const formData = new FormData();
    formData.append('file', event);
    this.http.post<any>(`${environment.urlAddress}` + '/upload', formData).subscribe((res) => {
      this.logoImage = environment.img_url + res.filename;
      // this.clientForm.patchValue({
      //   profilePicture: res.filename
      // });
    }, (err) => console.log(err)
    );
  }
}
