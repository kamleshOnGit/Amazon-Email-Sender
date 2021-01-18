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
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit, AfterViewInit {
  bodydata = {};
  displayedColumns: string[] = ['Vendorname', 'IsActive', 'Action'];
  popupmsg = { message: '' };
  dataSourceNew = [];
  dataSource = new MatTableDataSource(this.dataSourceNew);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  constructor(private repoService: RepositoryService,
    public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {

    this.title.setTitle("Vendors");
    this.getAllTenants();

  }

  public getAllTenants = () => {
    this.repoService.getData('tenants')
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data.data);
      }, error => {
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      });
  }
  public openDialog(action, obj, setting = null) {
    obj.action = action;
    obj.setting = setting;
    obj.IsActive = true;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'AddNewVendor') {
        this.addNewVendor(result.data);
      } else if (result.event === 'AddVendorSetting') {
        this.settingVender(result.data);
      } else if (result.event === 'EditVendorSetting') {
        this.settingVenderUpdate(result.data);
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

  public addRowData(rowobj: any) {
    const d = new Date();
    this.dataSourceNew.push({
      id: d.getTime(),
      Vendorname: rowobj.Vendorname,
      IsActive: 'Yes',
    });
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(rowobj) {
    this.dataSourceNew = this.dataSourceNew.filter((value, key) => {
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
    this.dataSourceNew = this.dataSourceNew.filter((value, key) => {
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
  public deleteRowData(rowobj) {
    this.dataSourceNew = this.dataSourceNew.filter((value, key) => {
      return value.id !== rowobj.id;
    });
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  giveVenderId(id: string) {
    this.repoService.vendorId = id;
    this.router.navigate(['/superadmin/users']);
  }
  public addNewVendor(data) {
    this.getAllTenants();
    if (data.logo) {
      this.bodydata = {
        name: data.name,
        logo: data.logo,
        status: data.status,
      };
    }
    this.bodydata = {
      name: data.name,
      status: data.status,
    };
    this.repoService.create('addTenant', this.bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('AddVendor', this.popupmsg);
      this.getAllTenants();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }
  public settingVender(data) {
    const bodydata = {
      tenantId: data.tenantId,
      sellerId: data.sellerId,
      marketplaceId: data.marketplaceId,
      refreshToken: data.refreshToken,
      defaultValues: data.defaultValues
    };
    this.repoService.create('setting', bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('addsetting', this.popupmsg);
      this.getAllTenants();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }
  public settingVenderUpdate(data) {
    const defaultValues = {
      recieve_success_login_email: data.setting.RecieveSucessLoginEmail,
      recieve_failed_login_email: data.setting.RecieveFailedLoginEmail,
      recieve_lock_login_email: data.setting.RecieveEmailWhenUserLock,
      restrict_order_qty: data.setting.RestrictOrderQuantity,
      apply_restriction_on_threshold: data.setting.ApplyRestrictionOnThreshold,
      max_order_qty: data.setting.MaxOrderQuantity,
      threshold: data.setting.ThresholdValue,
      api_request_hourly: data.setting.ApiRequestHourly,
      api_request_daily: data.setting.ApiRequestDaily,
      inventory_update: data.setting.InventoryUpdate,
      order_qty_sku: data.setting.order_qty_sku,
    }
    const bodydata = {
      tenantId: data.tenantId,
      sellerId: data.setting.sellerId,
      marketplaceId: data.setting.marketplaceId,
      refreshToken: data.setting.refreshToken,
      defaultValues: JSON.stringify(defaultValues)
    };
    this.repoService.update('updateSetting', bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('updatesetting', this.popupmsg);
      this.getAllTenants();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }
}
