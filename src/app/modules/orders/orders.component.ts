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
import { FormControl, FormGroup } from '@angular/forms';
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
import { DecriptionService } from '../../shared/decription.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'orderId',
    'sku',
    'buyerEmail',
    'quantityPurchased',
    'lastUpdateDate',
    'orderStatus',
    'Action',
  ];

  public dataSource;
  public pagenumber = 0;
  public pagesize = 50;
  public orderIds = [];
  popupmsg = { message: '' };
  selection = new SelectionModel<any>(true, []);
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
    private Decription: DecriptionService,
    private title: Title
  ) {
  }

  ngAfterViewInit() {
    this.title.setTitle("Orders");
    if (this.dataSource)
      this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = '' + Math.random();
  }

  ngOnInit() {
    this.getAllOrders();
  }
  public getAllOrders = () => {
    this.pagenumber += 1;
    this.repoService.getData('orders/' + this.pagenumber + '/' + this.pagesize).subscribe((res: any) => {
      if (res && res.data && res.data.rows.length > 0) {
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
      if (res.data.rows.length === 0) {
        this.popupmsg.message = res.message;
        this.openDialogSmall('loaded', this.popupmsg);
      }
    }, error => {
      this.dataSource = new MatTableDataSource([]);
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource && this.dataSource.data ? this.dataSource.data.length : null;
    this.orderIds = this.selection.selected;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  public openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Upload Order File') {
        this.updateOrders(result.data);
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
    });
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
    this.repoService.create('import/orders/', { 'orders': data }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('updatestatus', this.popupmsg);
      this.pagenumber = this.pagenumber - 1;
      this.getAllOrders();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }
  public updateOrderStatus(element) {

    const orderIdarray = this.orderIds.map(v => v.orderId);
    this.repoService.update('order/updateOrderStatus', { orderIdArray: orderIdarray }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('updatestatus', this.popupmsg);
      this.pagenumber = this.pagenumber - 1;
      this.getAllOrders();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });


  }
}
