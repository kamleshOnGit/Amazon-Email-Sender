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
import { ProductKeys } from '../../shared/uniqueKeys.model';
import { MatSelectChange } from '@angular/material/select';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-unique-keys',
  templateUrl: './unique-keys.component.html',
  styleUrls: ['./unique-keys.component.scss']
})
export class UniqueKeysComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['BatchCode', 'Status', 'Priority', 'Action'];

  // dataSourceNew = ELEMENT_DATA;
  dataSource;
  codeUsed = 0;
  productData;
  selectedProductSellerSku = null;
  popupmsg = { message: '' };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  selectedMarketPlaceId = null;

  constructor(private repoService: RepositoryService, public dialog: MatDialog, private title: Title) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {

    this.title.setTitle("Unique keys");
    this.getAllOwners();
    this.dataSource = new MatTableDataSource(this.dataSource);
  }

  public getAllOwners = () => {
    this.repoService.getData('products')
      .subscribe((res: any) => {
        this.productData = res.data.data;

      });
  }
  public selectedValue(event: MatSelectChange) {
    this.selectedMarketPlaceId = event.value.marketPlaceProductId;
    this.selectedProductSellerSku = event.value.sellerSku;
    this.getAllkeys();
  }
  public getAllkeys = () => {
    this.repoService.create('productkeys/sku', { sku: this.selectedProductSellerSku, pageNumber: 1, pageSize: 50 })
      .subscribe((res: any) => {
        // if (res && res.data && res.data.data && res.data.data.length > 0) {
        //     res.data.data.forEach(element => {
        //         let activeCount = 0;
        //         let usedCount = 0;
        //         if (element.productKeys.length > 0) {
        //             activeCount = element.productKeys.filter(x => x.status === 'active').length;
        //             usedCount = element.productKeys.filter(x => x.status === 'used').length;
        //         }
        //         element.activeCount = activeCount;
        //         element.usedCount = usedCount;
        //     });
        // }
        this.dataSource = new MatTableDataSource(res.data.data.rows);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
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
    if (action == "AddSinglekey") {
      obj.IsActive = true;
    }
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',

      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'AddSinglekey') {
        this.addRowData(result.data);
      } else if (result.event === 'Updatekey') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'AddAll') {
        this.updateAll(result.data);
      } else if (result.event === 'Upload Multiple Keys') {
        this.updateproductKeys(result.data);
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
        // this.addRowData(result.data);
      } else if (result && result.event === 'Updatekey') {
        // this.updateRowData(result.data);
      }
    });
  }

  public addRowData(data) {
    const bodydata = {
      key: data.key,
      status: data.status,
      batch: data.batch,
      priority: data.priority,
      sku: this.selectedMarketPlaceId,
    };

    this.repoService.create('product/productkey', bodydata).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('AddProductkey', this.popupmsg);
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('AddProductkey', this.popupmsg);
    });
    // this.table.renderRows();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(data) {
    const bodydata = {
      key: data.key,
      status: data.status,
      batch: data.batch,
      priority: data.priority,
      // sku : data.marketPlaceProductId,
    };
    this.repoService.update('product/productKey/' + data.id, bodydata).subscribe();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateAll(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        value.SKU = rowobj.name;
        value.Action = rowobj.category;
        value.BatchCode = rowobj.IsActive;
      }
      // this.dataSource = new MatTableDataSource(this.dataSourceNew);
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

  public updateproductKeys(data: any) {
    // const bodydata = JSON.parse(JSON.stringify(data));
    this.openDialogSmall('product not found', data.productnotfound);
    this.repoService.create('import/productskeys', { 'productskey': data }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('productdeleted', this.popupmsg);
      this.getAllOwners();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });

  }
  public delepredouct(element: any) {
    this.repoService.delete2('productkey/delete', { id: element.id }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('productdeleted', this.popupmsg);
      this.getAllkeys();

    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }

  public revokeOrder(element) {
    this.repoService.create('productkey/revoke', { 'orderId': '' + element.orderId }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('updatestatus', this.popupmsg);
      this.getAllOwners();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }

}
