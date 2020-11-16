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
  name: string;
  category: string;
  IsActive: string;
  UniqueKey: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Action: 'Edit', name: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(120)' },
  {id: 2,  Action: 'Edit', name: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(200)' },
  {id: 3,  Action: 'Edit', name: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(137)' },
  {id: 4,  Action: 'Edit', name: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(153)' },
  {id: 5,  Action: 'Edit', name: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(175)' },
  {id: 6,  Action: 'Edit', name: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(176)' },
  {id: 7,  Action: 'Edit', name: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(20)' },
  {id: 8,  Action: 'Edit', name: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(39)' },
  {id: 9,  Action: 'Edit', name: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(23)' },
  {id: 10,  Action: 'Edit', name: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , UniqueKey: 'View Details(35)' },
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements  AfterViewInit , OnInit {

  displayedColumns: string[] = ['Action', 'Product Name', 'Category', 'IsActive', 'UniqueKey'];

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
      name: rowobj.name,
      Action: 'Edit',
      category: rowobj.category,
      IsActive: rowobj.IsActive,
      UniqueKey: rowobj.UniqueKey,
    });
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(rowobj) {
    this.dataSourceNew  = this.dataSourceNew.filter((value, key) => {
      if (value.id === rowobj.id) {
        value.name = rowobj.name;
        value.category = rowobj.category;
        value.IsActive = rowobj.IsActive ;
        value.UniqueKey = rowobj.UniqueKey;
      }
      this.dataSource = new MatTableDataSource(this.dataSourceNew);
      this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public updateAll(rowobj) {
    this.dataSourceNew  = this.dataSourceNew .filter((value, key) => {
      if (value.id === rowobj.id) {
        value.name = rowobj.name;
        value.category = rowobj.category;
        value.IsActive = rowobj.IsActive ;
        value.UniqueKey = rowobj.UniqueKey;
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
