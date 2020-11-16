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
  Action: string;
  SKU: string;
  BatchCode: string;
  CodeAvailable: number;
  CodeUsed: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Action: 'Add New', SKU: 'MacAfee', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 2, Action: 'Add New', SKU: 'Nortan', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 3, Action: 'Add New', SKU: 'AVG', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 4, Action: 'Add New', SKU: 'MacAfee', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 5, Action: 'Add New', SKU: 'Nortan', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 6, Action: 'Add New', SKU: 'AVG', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
];

@Component({
  selector: 'app-unique-keys',
  templateUrl: './unique-keys.component.html',
  styleUrls: ['./unique-keys.component.scss']
})
export class UniqueKeysComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['Action' , 'SKU', 'BatchCode', 'CodeAvailable', 'CodeUsed', ];

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
      width: '320px',
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
    this.dataSourceNew .push( {
      id: d.getTime(),
      SKU: rowobj.SKU,
      Action: 'Add New',
      BatchCode: rowobj.BatchCode,
      CodeAvailable: rowobj.CodeAvailable,
      CodeUsed: rowobj.CodeUsed,
    });
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(rowobj) {
    this.dataSourceNew  = this.dataSourceNew.filter((value, key) => {
      if (value.id === rowobj.id) {
        value.SKU = rowobj.name;
        value.Action = rowobj.category;
        value.BatchCode = rowobj.IsActive ;
        value.CodeAvailable = rowobj.UniqueKey;
        value.CodeUsed = rowobj.CodeUsed;
      }
      this.dataSource = new MatTableDataSource(this.dataSourceNew);
      this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public updateAll(rowobj) {
    this.dataSourceNew  = this.dataSourceNew .filter((value, key) => {
      if (value.id === rowobj.id) {
        value.SKU = rowobj.name;
        value.Action = rowobj.category;
        value.BatchCode = rowobj.IsActive ;
        value.CodeAvailable = rowobj.UniqueKey;
        value.CodeUsed = rowobj.CodeUsed;
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
