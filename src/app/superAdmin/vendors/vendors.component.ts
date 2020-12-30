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
import { ActivatedRoute, Router } from '@angular/router';
export interface PeriodicElement {
  id: number;
  Vendorname: string;
  Emailaddress: string;
  IsActive: string;
  Phonenumber: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1,  Vendorname: 'Vendor1', Emailaddress: 'abc@test@com', IsActive: 'Yes' , Phonenumber: '987654321' },
  {id: 1,  Vendorname: 'Vendor1', Emailaddress: 'abc@test@com', IsActive: 'Yes' , Phonenumber: '987654321' },
  {id: 1,  Vendorname: 'Vendor1', Emailaddress: 'abc@test@com', IsActive: 'Yes' , Phonenumber: '987654321' },
  {id: 1,  Vendorname: 'Vendor1', Emailaddress: 'abc@test@com', IsActive: 'Yes' , Phonenumber: '987654321' },
  {id: 1,  Vendorname: 'Vendor1', Emailaddress: 'abc@test@com', IsActive: 'Yes' , Phonenumber: '987654321' },
  {id: 1,  Vendorname: 'Vendor1', Emailaddress: 'abc@test@com', IsActive: 'Yes' , Phonenumber: '987654321' },
];

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['Vendorname', 'Emailaddress', 'IsActive', 'Phonenumber' , 'Action'];

  dataSourceNew = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.dataSourceNew) ;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  constructor(private repoService: RepositoryService ,
              public dialog: MatDialog , private router: Router , private route: ActivatedRoute , ) { }

  ngOnInit() {
    this.getAllOwners();

  }


  public getAllOwners = () => {
    this.repoService.getData('tenants')
    .subscribe( (res: any) => {
      this.dataSource  = new MatTableDataSource(res.data.data);
      console.log(res.data.data);
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
      if (result.event === 'AddNewVendor') {
        this.addNewVendor(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'AddAll') {
        this.updateAll(result.data);
      } else if (result.event === 'AddVendorSetting') {
        this.settingVender(result.data);
      } else if (result.event === 'EditVendorSetting') {
        this.settingVenderUpdate(result.data);
      }
     });
  }

 public addRowData( rowobj: any ) {
    const d = new Date();
    this.dataSourceNew .push( {
      id: d.getTime(),
      Vendorname: rowobj.Vendorname,
      Emailaddress: rowobj.Emailaddress,
      IsActive : 'Yes',
      Phonenumber : '987654321'
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
  giveVenderId(id: string) {
    this.repoService.vendorId = id;
    this.router.navigate(['/superadmin/users']);
  }
  public addNewVendor(data) {
    console.log( data);
    this.getAllOwners();
    const bodydata = {
      name: data.name,
      logo: data.logo,
      status: data.status,
    };
    this.repoService.create('addTenant', bodydata).subscribe((res: any) => console.log(res));
  }
  public settingVender(data) {
    console.log( data);
    const bodydata = {
      tenantId: data.tenantId,
      sellerId: data.sellerId,
      marketplaceId: data.marketplaceId,
      refreshToken: data.refreshToken,
      defaultValues: data.defaultValues
    };
    this.repoService.create('setting', bodydata).subscribe((res: any) => console.log(res));
  }
  public settingVenderUpdate(data) {
    console.log( data);
    const bodydata = {
      tenantId: data.tenantId,
      sellerId: data.sellerId,
      marketplaceId: data.marketplaceId,
      refreshToken: data.refreshToken,
      defaultValues: data.defaultValues
    };
    this.repoService.create('updateSetting', bodydata).subscribe((res: any) => console.log(res));
  }
}
