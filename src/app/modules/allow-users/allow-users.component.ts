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
import { MatSelectChange } from '@angular/material/select';



export interface PeriodicElement {
  id: number;
  Action: string;
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
    Username: 'ABC',
    Emailaddress : 'abc@test.com',
    IsActive: 'Yes' ,
    Phonenumber: '987654321',
    Role: 'Admin'},
    {
      id: 1,
      Action: 'Edit',
      Username: 'Vendor2',
      Emailaddress : 'abc@test.com',
      IsActive: 'Yes' ,
      Phonenumber: '987654321',
      Role: 'Admin'},
      {
        id: 1,
        Action: 'Edit',
        Username: 'Vendor3',
        Emailaddress : 'abc@test.com',
        IsActive: 'Yes' ,
        Phonenumber: '987654321',
        Role: 'Admin'},
        {
          id: 1,
          Action: 'Edit',
          Username: 'Vendor4',
          Emailaddress : 'abc@test.com',
          IsActive: 'Yes' ,
          Phonenumber: '987654321',
          Role: 'Admin'},
          {
            id: 1,
            Action: 'Edit',
            Username: 'Vendor5',
            Emailaddress : 'abc@test.com',
            IsActive: 'Yes' ,
            Phonenumber: '987654321',
            Role: 'Admin'},
  ];

@Component({
  selector: 'app-allow-users',
  templateUrl: './allow-users.component.html',
  styleUrls: ['./allow-users.component.scss']
})
export class AllowUsersComponent implements OnInit {


  displayedColumns: string[] = [ 'Username', 'Emailaddress', 'IsActive' , 'Role' , 'Action'];
  selectedSelectBox = 1;
  vendors = [
    'Vendor1' , 'Vendor2' , 'Vendor3' , 'Vendor4'
  ];

  dataSource ;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private repoService: RepositoryService , public dialog: MatDialog) { }

  ngOnInit() {

    this.getAllOwners();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public getAllOwners = () => {
    this.repoService.getData('admin/users')
    .subscribe( (res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res.data);
    });
  }

 public selectedValue(event: MatSelectChange) {
    this.selectedSelectBox = event.value;
    this.getAllOwners();
    console.log( event.value);
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
       if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'AddAll') {
        this.updateAll(result.data);
      } else if (result.event === 'AddUser') {
          this.addNewUser(result.data);
      } });
  }

 public addRowData( rowobj: any ) {
    const d = new Date();
    this.dataSource .push( {
      id: d.getTime(),
      Action: 'Edit',
      Vendorname: rowobj.Vendorname,
      Username: rowobj.Username,
      Emailaddress: rowobj.Emailaddress,
      IsActive: rowobj.IsActive,
      Phonenumber: rowobj.Phonenumber,
      Role: rowobj.Role
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(rowobj) {
    this.dataSource  = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        // value.SKU = rowobj.name;
        // value.Action = rowobj.category;
        // value.BatchCode = rowobj.IsActive ;
        // value.CodeAvailable = rowobj.UniqueKey;
        // value.CodeUsed = rowobj.CodeUsed;
      }
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public updateAll(rowobj) {
    this.dataSource  = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        // value.SKU = rowobj.name;
        // value.Action = rowobj.category;
        // value.BatchCode = rowobj.IsActive ;
        // value.CodeAvailable = rowobj.UniqueKey;
        // value.CodeUsed = rowobj.CodeUsed;
      }
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.paginator._changePageSize(this.paginator.pageSize);
      return true;
    });
  }
  public  deleteRowData(rowobj) {
    this.dataSource  = this.dataSource.filter(( value, key) => {
      return value.id !== rowobj.id;
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public addNewUser(data) {
    console.log( data);
    this.getAllOwners();
    const bodydata = {
      roleId: data.roleId,
      firstName: data.firstname,
      lastName: data.lastname,
      status: data.status,
      email: data.email,
      password: data.password
    };
    this.repoService.create('user', bodydata).subscribe((res: any) => console.log(res));
 }


}