import {
  Component,
  OnInit,
  ContentChildren,
  Input,
  AfterViewInit,
  QueryList,
  ViewChild,
  ContentChild,
  AfterContentInit,
} from '@angular/core';
import { AuthService } from '../../shared/auth.services';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['Brand', 'name', 'category', 'status', 'productkey', 'Action'];
  public EmailTemplateList = [];
  public dataSource;
  popupmsg = { message: '' };

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private repoService: RepositoryService, public dialog: MatDialog, public authService: AuthService, private title: Title) { }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.title.setTitle("Products");
    this.getAllOwners();
    this.getEmailTemplate();
  }
  public getAllOwners = () => {
    this.repoService.getData('products')
      .subscribe((res: any) => {
        console.log(res.data.data);
        this.dataSource = new MatTableDataSource(res.data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  public getEmailTemplate = () => {
    this.repoService.getData('emailTemplate')
      .subscribe((res: any) => {
        // this.dataSource = new MatTableDataSource(res.data);
        this.EmailTemplateList = res.data;
      }, error => {
        console.log(error.error.message);
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      });
  }
  public redirectToDetails = (id: string) => {
  }
  public redirectToUpdate = (id: string) => {
  }
  public redirectToDelete = (id: string) => {
  }

  public openDialog(action, obj) {
    obj.action = action;
    if (this.EmailTemplateList.length == 0) {
      this.openDialogSmall('AddProduct', { message: 'Email list is empty Please add email First' });
      return;
    }
    if (action == "AsignEmailToProduct") {
      obj.emailTemplateList = this.EmailTemplateList;
    }
    else if (action == "Add") {
      obj.IsActive = true;
    }
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'AddAll') {
        this.updateAll(result.data);
      } else if (result.event === 'Upload Product File') {
        this.updateproduct(result.data);
      } else if (result.event === 'AsignEmailToProduct') {
        this.asignEmailToproduct(result.data.emailId, obj.id);
      }
    });
  }

  public openDialogSmall(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.event === 'product not found') {
        this.addRowData(result.data);
      } else if (result && result.event === 'Updatekey') {
        this.updateRowData(result.data);
      }
    });
  }
  public asignEmailToproduct(emailId, productId) {
    this.repoService.create('product/asignEmail', { productId: productId, emailId: emailId }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('AddProduct', this.popupmsg);
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('AddProduct', this.popupmsg);
    });
  }
  public addRowData(data: any) {

    console.log(data);
    const bodydata = {
      itemName: data.itemName,
      sellerSku: data.sellerSku,
      quantity: data.quantity,
      category: data.category,
      status: data.status,
      ProductId: data.marketPlaceProductId,
      price: data.price
    };
    this.repoService.create('product/product', bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('AddProduct', this.popupmsg);
      this.getAllOwners();

    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('AddProduct', this.popupmsg);
    });
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(data) {
    console.log(data);
    const bodydata = {
      itemName: data.itemName,
      sellerSku: data.sellerSku,
      quantity: data.quantity,
      category: data.category,
      status: data.status,
      ProductId: data.marketPlaceProductId,
      price: data.price
    };
    this.repoService.update('product/product/' + data.id, bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('productdeleted', this.popupmsg);
      console.log(res.data);
      this.getAllOwners();
    }, error => {
      console.log(error.error.message);
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public updateAll(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        value.name = rowobj.name;
        value.Brand = rowobj.Brand;
        value.category = rowobj.category;
        value.Status = rowobj.Status;
        value.UniqueKey = rowobj.UniqueKey;
      }
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public deleteRowData(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowobj.id;
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public updateproduct(data: any) {
    // const bodydata = JSON.parse(JSON.stringify(data));
    console.log(data);
    this.repoService.create('import/products', { 'products': data }).subscribe((res: any) => {
      console.log(res);
      this.popupmsg.message = res.message;
      this.openDialogSmall('productdeleted', this.popupmsg);
      this.getAllOwners();
    }, error => {
      console.log(error.error.message);
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    }
    );
  }

  public delepredouct(element: any) {
    console.log(element.id);
    this.repoService.delete2('product/delete', { id: element.id }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('productdeleted', this.popupmsg);
      console.log(res.data);
      this.getAllOwners();
    }, error => {
      console.log(error.error.message);
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }

}
