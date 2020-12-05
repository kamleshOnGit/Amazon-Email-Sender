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
import {MatPaginator} from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';

export interface PeriodicElement {
  id: number;
  Actions: string;
  OrderSKU: string;
  OrderID: number;
  orderBy: string;
  quantityOrdered: number;
  orderTime: string;
  status: string;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    Actions: 'Ship',
    OrderSKU: 'MacAfee',
    OrderID: 1,
    orderBy: 'abc@gmail.com',
    quantityOrdered: 5 ,
    orderTime: '11 Nov 2020 11:43 AM',
    status: 'Pending',
    Action: 'Revoke'
  },
  {
    id: 2,
    Actions: 'Ship',
    OrderSKU: 'Norton',
    OrderID: 1,
    orderBy: 'abc@gmail.com',
    quantityOrdered: 5 ,
    orderTime: '11 Nov 2020 11:43 AM',
    status: 'Pending',
    Action: 'Revoke'
  },
  {
    id: 3,
    Actions: 'Ship',
    OrderSKU: 'AVG',
    OrderID: 1,
    orderBy: 'abc@gmail.com',
    quantityOrdered: 5 ,
    orderTime: '11 Nov 2020 11:43 AM',
    status: 'Pending',
    Action: 'Revoke'
  },
  {
    id: 4,
    Actions: 'Ship',
    OrderSKU: 'Kaspersky',
    OrderID: 1,
    orderBy: 'abc@gmail.com',
    quantityOrdered: 5 ,
    orderTime: '11 Nov 2020 11:43 AM',
    status: 'Pending',
    Action: 'Revoke'
  },

];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'OrderSKU', 'OrderID', 'orderBy', 'quantityOrdered', 'orderTime', 'status', 'Actions' , 'Action' ];

  dataSourceNew = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.dataSourceNew) ;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private repoService: RepositoryService , public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    // this.getAllOwners();
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
  }
  public getAllOwners = () => {
    this.repoService.getData('api/owner')
    .subscribe(res => {
      this.dataSourceNew  = res as PeriodicElement[];
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
    const dialogRef = this.dialog.open( DialogBoxComponent, {
      width: '1000px',
      data: obj
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'AddAll') {
        this.updateAll(result.data);
        } });
  }

 public addRowData( rowobj: any ) {
    const d = new Date();
    // this.dataSourceNew .push( {
    //   id: d.getTime(),
    //   SKU: rowobj.SKU,
    //   Action: 'Add New',
    //   BatchCode: rowobj.BatchCode,
    //   CodeAvailable: rowobj.CodeAvailable,
    //   CodeUsed: rowobj.CodeUsed,
    // });
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(rowobj) {
    this.dataSourceNew  = this.dataSourceNew.filter((value, key) => {
      if (value.id === rowobj.id) {
        // value.SKU = rowobj.name;
        // value.Action = rowobj.category;
        // value.BatchCode = rowobj.IsActive ;
        // value.CodeAvailable = rowobj.UniqueKey;
        // value.CodeUsed = rowobj.CodeUsed;
      }
      this.dataSource = new MatTableDataSource(this.dataSourceNew);
      this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public updateAll(rowobj) {
    this.dataSourceNew  = this.dataSourceNew .filter((value, key) => {
      if (value.id === rowobj.id) {
        // value.SKU = rowobj.name;
        // value.Action = rowobj.category;
        // value.BatchCode = rowobj.IsActive ;
        // value.CodeAvailable = rowobj.UniqueKey;
        // value.CodeUsed = rowobj.CodeUsed;
      }
      this.dataSource = new MatTableDataSource(this.dataSourceNew);
      this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public  deleteRowData(rowobj) {
    this.dataSourceNew  = this.dataSourceNew.filter(( value, key) => {
      return value.id !== rowobj.id;
    });
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
    this.paginator._changePageSize(this.paginator.pageSize);
  }


}
