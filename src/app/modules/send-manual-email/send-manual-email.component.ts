import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { MatSelectChange } from '@angular/material/select';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-send-manual-email',
  templateUrl: './send-manual-email.component.html',
  styleUrls: ['./send-manual-email.component.scss']
})
export class SendManualEmailComponent implements OnInit {

  constructor(private repoService: RepositoryService , public dialog: MatDialog,private title:Title) { }
  manualsenddata = {
    email: 'test@test.com',
    quantity: '2',
    marketplace: '',
    sku: '' ,
  };
  public popupmsg = {message: ''};
  public productsku;
  ngOnInit() {    
    this.title.setTitle("Manual Email");
    this.getAllProduct();
  }
  public getAllProduct = () => {
    this.repoService.getData('products')
    .subscribe( (res: any) => {
      console.log(res.data.data);
      this.productsku = res.data.data;
    }, error => {
      console.log(error.error.message);
      this.popupmsg.message =  error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }

  public selectedValue(event: MatSelectChange) {
    this.manualsenddata.sku = event.value;
    console.log( event.value);
  }

  public selectedValue2(event: MatSelectChange) {
    this.manualsenddata.marketplace = event.value;
    console.log( event.value);
  }

  public openDialogSmall(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open( DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result && result.event === 'product not found') {
        // this.addRowData(result.data);
      } else if (result && result.event === 'Updatekey') {
        // this.updateRowData(result.data);
      }  });
  }

  public sendManualEmail() {
    // const bodydata = JSON.parse(JSON.stringify(data));
    console.log(this.manualsenddata);
    this.repoService.create('order/manually/processorder',
     {marketplace : this.manualsenddata.marketplace, sku : this.manualsenddata.sku
       , email : this.manualsenddata.email, qty: +this.manualsenddata.quantity }).subscribe((res: any) =>  {
        this.popupmsg.message = res.message ;
        this.openDialogSmall('mailsent', this.popupmsg);
        console.log(res);
      }, error => {
        console.log(error.error.message);
        this.popupmsg.message =  error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      } );

  }

}
