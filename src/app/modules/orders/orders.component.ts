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
import {FormControl, FormGroup} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { DatePipe } from '@angular/common';
import {DecriptionService} from '../../shared/decription.service';

export interface PeriodicElement {
  buyerEmail: string;
  buyerName: string;
  buyerPhoneNumber: number;
  createdAt: string;
  id: number;
  lastUpdateDate: string;
  orderId: string;
  orderItemId: number;
  orderStatus: string;
  orderType: string;
  paymentMethod: string;
  productName: string;
  quantityPurchased: number;
  shipPhoneNumber: number;
  sku: string;
  tenantId: number;
  updatedAt: string;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[]  =   [
  {
    id: 1,
    tenantId: 1,
    orderId: '114-1704415-5635410',
    orderItemId: null,
    buyerEmail: 's7r9v7qjl3vxyxh@marketplace.am',
    buyerName: 'Viren',
    buyerPhoneNumber: null,
    sku: 'NvD9p-SD_Regular_Black',
    productName: null,
    quantityPurchased: 1,
    shipPhoneNumber: null,
    orderType: 'StandardOrder',
    orderStatus: 'Pending',
    paymentMethod: 'Other',
    lastUpdateDate: '2019-12-30T13:27:53.654Z',
    createdAt: '2020-12-09T09:58:48.000Z',
    updatedAt: '2020-12-09T09:58:48.000Z',
    Action: 'Revoke',
  },
  {
    id: 2,
    tenantId: 1,
    orderId: '114-1704415-5635410',
    orderItemId: null,
    buyerEmail: 's7r9v7qjl3vxyxh@marketplace.am',
    buyerName: 'Viren',
    buyerPhoneNumber: null,
    sku: 'NvD9p-SD_Regular_Black',
    productName: null,
    quantityPurchased: 1,
    shipPhoneNumber: null,
    orderType: 'StandardOrder',
    orderStatus: 'Pending',
    paymentMethod: 'Other',
    lastUpdateDate: '2019-12-30T13:27:53.654Z',
    createdAt: '2020-12-09T09:58:48.000Z',
    updatedAt: '2020-12-09T09:58:48.000Z',
    Action: 'Revoke',
  },
  {
    id: 3,
    tenantId: 1,
    orderId: '114-1704415-5635410',
    orderItemId: null,
    buyerEmail: 's7r9v7qjl3vxyxh@marketplace.am',
    buyerName: 'Viren',
    buyerPhoneNumber: null,
    sku: 'NvD9p-SD_Regular_Black',
    productName: null,
    quantityPurchased: 1,
    shipPhoneNumber: null,
    orderType: 'StandardOrder',
    orderStatus: 'Pending',
    paymentMethod: 'Other',
    lastUpdateDate: '2019-12-30T13:27:53.654Z',
    createdAt: '2020-12-09T09:58:48.000Z',
    updatedAt: '2020-12-09T09:58:48.000Z',
    Action: 'Revoke',
  },
  {
    id: 4,
    tenantId: 1,
    orderId: '114-1704415-5635410',
    orderItemId: null,
    buyerEmail: 's7r9v7qjl3vxyxh@marketplace.am',
    buyerName: 'Viren',
    buyerPhoneNumber: null,
    sku: 'NvD9p-SD_Regular_Black',
    productName: null,
    quantityPurchased: 1,
    shipPhoneNumber: null,
    orderType: 'StandardOrder',
    orderStatus: 'Pending',
    paymentMethod: 'Other',
    lastUpdateDate: '2019-12-30T13:27:53.654Z',
    createdAt: '2020-12-09T09:58:48.000Z',
    updatedAt: '2020-12-09T09:58:48.000Z',
    Action: 'Revoke',
  },
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'orderId',
    'sku',
    'buyerEmail',
    'quantityPurchased',
    'createdAt',
    'orderStatus',
    'Action',
  ];

  public dataSource ;
  public pagenumber = 1;
  public pagesize = 50;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

get fromDate() { return this.filterForm.get('fromDate').value; }
get toDate() { return this.filterForm.get('toDate').value; }


  constructor(
    private repoService: RepositoryService,
    public dialog: MatDialog, public authService: AuthService,
    private Decription: DecriptionService
  ) {
    // this.dataSource.filterPredicate = (data, filter) => {
    //   if (this.fromDate && this.toDate) {
    //     return data.createdAt >= this.fromDate && data.createdAt <= this.toDate;
    //   }
    //   return true;
    // };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = '' + Math.random();
  }

  ngOnInit() {
    this.getAllOwners();
    // this.repoService.getData('orders').subscribe((res: any) =>
    // this.dataSource = new MatTableDataSource(res.data)
    //      );
    // this.dataSource = new MatTableDataSource(this.dataSourceNew);

  }
  public getAllOwners = () => {
    this.repoService.getData('orders/' + this.pagenumber + '/' + this.pagesize).subscribe((res: any) => {
      if (res && res.data  && res.data.length > 0) {
        res.data.rows.forEach(element => {
            let Email = '';
            if (element.buyerEmail.length > 0) {
                Email = this.Decription.decript(element.buyerEmail);
            }
            element.email = Email;
        });
    }
      this.dataSource = new MatTableDataSource(res.data.rows);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res.data);
    });
  }

  public redirectToDetails = (id: string) => {};
  public redirectToUpdate = (id: string) => {};
  public redirectToDelete = (id: string) => {};

  public openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',
      data: obj,
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
      } else if (result.event === 'Upload Order File') {
        this.updateOrders(result.data);
      }
    });
  }
  public openDialogSmall(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open( DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result.event === 'product not found') {
        this.addRowData(result.data);
      } else if (result.event === 'Updatekey') {
        this.updateRowData(result.data);
      }  });
  }
  public addRowData(rowobj: any) {
    const d = new Date();
    // this.dataSourceNew .push( {
    //   id: d.getTime(),
    //   SKU: rowobj.SKU,
    //   Action: 'Add New',
    //   BatchCode: rowobj.BatchCode,
    //   CodeAvailable: rowobj.CodeAvailable,
    //   CodeUsed: rowobj.CodeUsed,
    // });
  }
  public updateRowData(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        // value.SKU = rowobj.name;
        // value.Action = rowobj.category;
        // value.BatchCode = rowobj.IsActive ;
        // value.CodeAvailable = rowobj.UniqueKey;
        // value.CodeUsed = rowobj.CodeUsed;
      }
      this.dataSource = new MatTableDataSource(this.dataSource);
      // this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public updateAll(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        // value.SKU = rowobj.name;
        // value.Action = rowobj.category;
        // value.BatchCode = rowobj.IsActive ;
        // value.CodeAvailable = rowobj.UniqueKey;
        // value.CodeUsed = rowobj.CodeUsed;
      }
      this.dataSource = new MatTableDataSource(this.dataSource);
      // this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public deleteRowData(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowobj.id;
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
    // this.paginator._changePageSize(this.paginator.pageSize);
  }
 public updateOrders(data: any) {
  console.log( data);
  this.repoService.create('import/orders/', {'orders' : data}).subscribe((res: any) => console.log(res));
 }
 public revokeOrder(element) {
  console.log( element.orderId);
  this.repoService.create('productkey/revoke', {'orderId' : '' + element.orderId}).subscribe((res: any) =>  console.log(res));
  this.openDialogSmall('revokeorder', element);
 }
} 
