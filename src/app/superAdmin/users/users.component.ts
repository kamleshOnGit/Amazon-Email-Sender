import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { MatSelectChange } from '@angular/material/select';

import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Vendorname', 'Emailaddress', 'IsActive', 'Role', 'Action'];
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
    this.title.setTitle("Users");
    this.getAllvendors();
    this.selectedSelectBox = this.repoService.vendorId !== '' ? +this.repoService.vendorId : 1;
    this.getAllOwners();
  }

  ngAfterViewInit() {

  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public getAllOwners = () => {
    this.repoService.create('superadmin/users', { tenantId: this.selectedSelectBox })
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      });
  }
  public getAllvendors = () => {
    this.repoService.getData('tenants')
      .subscribe((res: any) => {
        this.vendors = res.data.data;
      }, error => {
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      });
  }

  public selectedValue(event: MatSelectChange) {
    this.selectedSelectBox = event.value;
    this.getAllOwners();
  }

  public redirectToDetails = () => {
  }
  public redirectToUpdate = () => {
  }
  public redirectToDelete = () => {
  }

  public openDialog(action, obj) {
    obj.action = action;
    obj.IsActive = true;
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
      } else if (result.event === 'AddNewUser') {
        this.addNewUser(result.data);
      } else if (result.event === 'updatenewUser') {
        this.updateNewUser(result.data);
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
      Emailaddress: rowobj.Emailaddress,
      IsActive: rowobj.IsActive,
      Role: rowobj.Role
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(rowobj) {
    this.dataSource = this.dataSource.filter((value) => {
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
    this.dataSource = this.dataSource.filter((value) => {
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
    this.dataSource = this.dataSource.filter((value) => {
      return value.id !== rowobj.id;
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public addNewUser(data) {
    const bodydata = {
      tenantId: data.tenentId,
      roleId: 2,
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      email: data.email,
      password: data.password
    };
    this.repoService.create('adminUser', bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('adduser', this.popupmsg);
      this.getAllOwners();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });

  }

  public updateNewUser(data) {
    const bodydata = {
      id: data.id,
      // roleId: data.roleId,
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
    };
    this.repoService.update('updateUser', bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('adduser', this.popupmsg);
      this.getAllOwners();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }
}
