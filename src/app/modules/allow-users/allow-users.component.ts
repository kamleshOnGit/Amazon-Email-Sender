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
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { MatSelectChange } from '@angular/material/select';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-allow-users',
  templateUrl: './allow-users.component.html',
  styleUrls: ['./allow-users.component.scss']
})
export class AllowUsersComponent implements OnInit {


  displayedColumns: string[] = ['Username', 'Emailaddress', 'IsActive', 'Role'];
  selectedSelectBox = 1;
  vendors = [
    'Vendor1', 'Vendor2', 'Vendor3', 'Vendor4'
  ];
  popupmsg = { message: '' };
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private repoService: RepositoryService, public dialog: MatDialog, private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Allow Users");
    this.getAllOwners();
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public getAllOwners = () => {
    this.repoService.getData('admin/users')
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      });
  }

  public selectedValue(event: MatSelectChange) {
    this.selectedSelectBox = event.value;
    this.getAllOwners();
  }

  public redirectToDetails = (id: string) => {
  }
  public redirectToUpdate = (id: string) => {
  }
  public redirectToDelete = (id: string) => {
  }

  public openDialog(action, obj) {
    obj.action = action;
    if (action == "AddUser") {
      obj.IsActive = true;
    }
    
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'AddAll') {
        this.updateAll(result.data);
      } else if (result.event === 'AddUser') {
        this.addNewUser(result.data);
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
  public addRowData(rowobj: any) {
    const d = new Date();
    this.dataSource.push({
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
    this.dataSource = this.dataSource.filter((value, key) => {
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
    this.dataSource = this.dataSource.filter((value, key) => {
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
  public deleteRowData(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowobj.id;
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public addNewUser(data) {
    const bodydata = {
      roleId: data.roleId,
      firstName: data.firstname,
      lastName: data.lastname,
      status: data.status,
      email: data.email,
      password: data.password
    };
    this.repoService.create('user', bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('adduser', this.popupmsg);    
    this.getAllOwners();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }


}