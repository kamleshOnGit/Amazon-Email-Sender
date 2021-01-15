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
import { MatSelectChange } from '@angular/material';


@Component({
  selector: 'app-viewuniques',
  templateUrl: './viewuniques.component.html',
  styleUrls: ['./viewuniques.component.scss']
})
export class ViewuniquesComponent implements OnInit {
  displayedColumns: string[] = ['BatchCode', 'Status', 'Priority'];

  // dataSourceNew = ELEMENT_DATA;
  dataSource;
  productData;
  popupmsg = { message: '' };
  codeUsed = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  selectedProductSellerSku: any;
  selectedMarketPlaceId: any;

  constructor(private repoService: RepositoryService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProducts();
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
        this.addProductKey(result.data);
      } else if (result.event === 'Upload Multiple Keys') {
        this.uploadProductKeys(result.data);
      }
    });
  }
  public getAlluniqueKeys = () => {
    this.repoService.create('productkeys/sku', { sku: this.selectedProductSellerSku, pageNumber: 1, pageSize: 50 })
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data.data.rows);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      });
  }
  public addProductKey(data) {
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
  public uploadProductKeys(data: any) {
    // this.openDialogSmall('product not found', data.productnotfound);
    this.repoService.create('import/productskeys', { 'productskey': data }).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('productdeleted', this.popupmsg);
      this.getAllProducts();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });

  }
  public selectedValue(event: MatSelectChange) {
    this.selectedMarketPlaceId = event.value.marketPlaceProductId;
    this.selectedProductSellerSku = event.value.sellerSku;
    this.getAlluniqueKeys();
  }
  public getAllProducts = () => {
    this.repoService.getData('products')
      .subscribe((res: any) => {
        this.productData = res.data.data;

      });
  }
}
