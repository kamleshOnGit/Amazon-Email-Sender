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
  Vendorname: string;
  Username: string;
  Emailaddress: string;
  IsActive: string;
  Phonenumber: string;
  Role: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    Action: 'Edit',
    Vendorname: 'Vendor1',
    Username: 'ABC',
    Emailaddress : 'abc@test.com',
    IsActive: 'Yes' ,
    Phonenumber: '987654321',
    Role: 'Admin'},
    {
      id: 1,
      Action: 'Edit',
      Vendorname: 'Vendor2',
      Username: 'Vendor2',
      Emailaddress : 'abc@test.com',
      IsActive: 'Yes' ,
      Phonenumber: '987654321',
      Role: 'Admin'},
      {
        id: 1,
        Action: 'Edit',
        Vendorname: 'Vendor3',
        Username: 'Vendor3',
        Emailaddress : 'abc@test.com',
        IsActive: 'Yes' ,
        Phonenumber: '987654321',
        Role: 'Admin'},
        {
          id: 1,
          Action: 'Edit',
          Vendorname: 'Vendor4',
          Username: 'Vendor4',
          Emailaddress : 'abc@test.com',
          IsActive: 'Yes' ,
          Phonenumber: '987654321',
          Role: 'Admin'},
          {
            id: 1,
            Action: 'Edit',
            Vendorname: 'Vendor5',
            Username: 'Vendor5',
            Emailaddress : 'abc@test.com',
            IsActive: 'Yes' ,
            Phonenumber: '987654321',
            Role: 'Admin'},
  ];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit , OnInit {

  displayedColumns: string[] = ['Vendorname', 'Username', 'Emailaddress', 'IsActive', 'Phonenumber' , 'Role' , 'Action'];

  vendors = [
    'Vendor1' , 'Vendor2' , 'Vendor3' , 'Vendor4'
  ];

  dataSourceNew = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.dataSourceNew) ;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private repoService: RepositoryService , public dialog: MatDialog) { }

  ngOnInit() {
    // this.getAllOwners();
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
      if (result.event === 'AddNewUser') {
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
      Action: 'Edit',
      Vendorname: rowobj.Vendorname,
      Username: rowobj.Username,
      Emailaddress: rowobj.Emailaddress,
      IsActive: rowobj.IsActive,
      Phonenumber: rowobj.Phonenumber,
      Role: rowobj.Role
    });
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
