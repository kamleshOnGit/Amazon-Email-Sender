import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from '../products.model';
import { ProductKeys } from '../uniqueKeys.model';
import { Orders } from '../orders.model';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatSelectChange } from '@angular/material/select';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PasswordStrengthValidator } from '../password-strength.validator';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';
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
export class DialogBoxComponent implements OnInit {
  roles = [{ id: 3, name: "Employee" }, { id: 4, name: "Support" }];
  dataArray = [];
  public Editor = ClassicEditor;
  products;
  orders;
  keys;
  records;
  action: string;
  localdata: any;
  selectcheck = false;
  selectcheckemail = false;
  selecttext = 'InActive';
  password = "password";
  productsAll = [];
  productnotfound = [];
  errortext = 'Unknow Error';
  @ViewChild('csvReader', { static: true }) csvReader: any;
  logoImage: any;
  err: boolean;
  EditVendorSettingForm: FormGroup;
  order_qty_sku: FormArray;
  issue = false;
  defaultValues: any;

  constructor(private repoService: RepositoryService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private http: HttpClient,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private fb: FormBuilder) {
    this.localdata = { ...data };
    this.localdata.message = this.localdata.message !== undefined ? this.localdata.message : this.errortext;
    this.action = this.localdata.action;
    this.selectcheck = this.localdata.IsActive;
    this.check();
    if (this.localdata.action == "UploadEmail" || this.localdata.action == "Upload Multiple Keys") {
      this.repoService.getData('products').subscribe((res: any) => {
        this.productsAll = res.data.data;
      });
    }

  }
  ngOnInit() {

    if (this.localdata.action == 'EditVendorSetting' || this.localdata.action == 'AddVendorSetting') {
      this.EditVenderSetting();
    }

  }

  EditVenderSetting() {

    // it make reactive form for  EditVendorSetting
    this.EditVendorSettingForm = this.fb.group({
      sellerId: [''],
      marketplaceId: [''],
      refreshToken: [''],
      RecieveSucessLoginEmail: [false],
      RecieveFailedLoginEmail: [false],
      RecieveEmailWhenUserLock: [false],
      InventoryUpdate: [false],
      ApplyRestrictionOnThreshold: [false],
      ThresholdValue: [0],
      ApiRequestHourly: [0],
      ApiRequestDaily: [0],
      RestrictOrderQuantity: [false],
      MaxOrderQuantity: [0],
      order_qty_sku: this.fb.array([this.createItem()])

    })
    if (this.localdata.action == 'EditVendorSetting') {
      this.defaultValues = JSON.parse(this.localdata.setting.defaultValues);
      this.EditVendorSettingForm.patchValue({
        sellerId: this.localdata.setting.sellerId,
        marketplaceId: this.localdata.setting.marketplaceId,
        refreshToken: this.localdata.setting.refreshToken,
        RecieveSucessLoginEmail: this.defaultValues.recieve_success_login_email,
        RecieveFailedLoginEmail: this.defaultValues.recieve_failed_login_email,
        RecieveEmailWhenUserLock: this.defaultValues.recieve_lock_login_email,
        InventoryUpdate: this.defaultValues.inventory_update,
        ApplyRestrictionOnThreshold: this.defaultValues.apply_restriction_on_threshold,
        ThresholdValue: this.defaultValues.threshold,
        ApiRequestHourly: this.defaultValues.api_request_hourly,
        ApiRequestDaily: this.defaultValues.api_request_daily,
        RestrictOrderQuantity: this.defaultValues.restrict_order_qty,
        MaxOrderQuantity: this.defaultValues.max_order_qty,

      });
      let controle = <FormArray>(this.EditVendorSettingForm.get("order_qty_sku"));
      this.defaultValues.order_qty_sku.forEach(element => {
        controle.push(this.createItem(element));
      });
      controle.removeAt(0)
    }
  }
  createItem(data = null) {
    if (data != null) {
      return this.fb.group({
        sku: data.sku,
        qty: data.qty
      })
    }
    else {
      return this.fb.group({
        sku: ['', Validators.required],
        qty: [0, Validators.required]
      })
    }

  }
  addItem() {
    this.order_qty_sku = this.EditVendorSettingForm.get('order_qty_sku') as FormArray;
    let l = this.order_qty_sku.controls.length - 1;
    // if (this.order_qty_sku.value[l]['sku'] == "" || (this.order_qty_sku.value[l]['qty'] == null || this.order_qty_sku.value[l]['qty'] == '' )) {
    if (this.order_qty_sku.status == "INVALID") {
      return this.issue = true
    }
    this.order_qty_sku.push(this.createItem());
    this.issue = false;
  }
  removeItem(i) {
    this.order_qty_sku = this.EditVendorSettingForm.get('order_qty_sku') as FormArray;
    this.order_qty_sku.removeAt(i)
  }


  get formControl() {
    return this.EditVendorSettingForm.controls;
  }


  passwordTest(data) {
    let test = data.target.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[A-Z]).{8,}/g);
    if (test == '' || test == null) {
      this.err = true;
    }
    else {
      this.err = false;
    }
  }
  showPassword(data) {
    if (data == "password") {
      this.password = "text";
    }
    else {
      this.password = "password";
    }
  }
  public selectedProductValue(event: MatSelectChange) {
    this.localdata.productId = event.value;
  }
  public selectedEmailValue(event: MatSelectChange) {
    this.localdata.emailId = event.value;
  }
  check() {
    if (this.localdata.IsActive == true) {

      this.selectcheck = true;
      this.selectcheckemail = true;
      this.selecttext = 'Active';
      this.localdata.status = this.selecttext;
    }
  }

  doAction() {
    if (this.logoImage !== null && this.logoImage !== undefined) {
      this.localdata['logo'] = this.logoImage
    }
    if (this.localdata.action == 'EditVendorSetting' || this.localdata.action == 'AddVendorSetting')
      this.localdata['setting'] = this.EditVendorSettingForm.value;
    this.dialogRef.close({ event: this.action, data: this.localdata });

  }

  // public getadminsettings(id: string) {
  //   this.repoService.getData('getSetting')
  // }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
    // window.location.reload();
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
      };

      reader.onerror = () => {
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
      };

      reader.onerror = () => {
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
      };

      reader.onerror = () => {
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
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  updateIsActiveEmail() {
    if (this.selectcheckemail !== true) {
      this.selecttext = 'InActive';
      this.localdata.status = this.selecttext;
    } else {
      this.selecttext = 'Active';
      this.localdata.status = this.selecttext;
    }
  }

  public selectedValue(event: MatSelectChange) {
    this.localdata.batch = event.value.batch;
    this.selectcheckemail = true;
    this.updateIsActiveEmail();
    this.localdata.id = event.value.id;
    this.localdata.priority = event.value.priority;
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
    }, (err) => {
      this.logoImage = 'logo';
    }
    );
  }
  onChange($event) {

  }

  onEditorChange($event) {

  }
  onReady($event) {
  }
  onFocus($event) {

  }
  onBlur($event) {

  }
  onContentDom($event) {

  }

  onFileUploadRequest($event) {

  }

  onFileUploadResponse($event) {

  }
  onPaste($event) {

  }
  onDrop($event) {

  }
}
