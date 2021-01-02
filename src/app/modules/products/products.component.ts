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
import { AuthService } from '../../shared/auth.services';
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
    tenantId: number;
    name: string;
    sellerSku: string;
    quantity: number;
    category: string;
    status: string;
    marketPlaceProductId: string;
    createdAt: string;
    updatedAt: string;
    productKeys: [
        {
            id: number,
            productId: number,
            productkey: string,
            tenantId: number,
            batch: string,
            status: string,
            priority: string,
            createdAt: string,
            updatedAt: string,
        }
    ];

}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {id: 1, Brand: 'ABC' , Action: 'Edit', name: 'MacAfee', category: 'Anti Virus',   Status: 'Active' , UniqueKey: 'View Details(120)' },
//   {id: 2, Brand: 'ABC' , Action: 'Edit', name: 'AvG', category: 'Anti Virus', Status: 'Active' , UniqueKey: 'View Details(200)' },
//   {id: 3, Brand: 'ABC' , Action: 'Edit', name: 'Norton', category: 'Anti Virus', Status: 'Active' , UniqueKey: 'View Details(137)' },
//   {id: 4, Brand: 'ABC' , Action: 'Edit', name: 'MacAfee', category: 'Anti Virus', Status: 'Active' , UniqueKey: 'View Details(153)' },
//   {id: 5, Brand: 'ABC' , Action: 'Edit', name: 'AvG', category: 'Anti Virus', Status: 'Active' , UniqueKey: 'View Details(175)' },
//   {id: 6, Brand: 'ABC' , Action: 'Edit', name: 'Norton', category: 'Anti Virus', Status: 'Active' , UniqueKey: 'View Details(176)' },
//   {id: 7, Brand: 'ABC' , Action: 'Edit', name: 'MacAfee', category: 'Anti Virus', Status: 'Active' , UniqueKey: 'View Details(20)' },
//   {id: 8, Brand: 'ABC' , Action: 'Edit', name: 'AvG', category: 'Anti Virus', Status: 'Active', UniqueKey: 'View Details(39)' },
//   {id: 9, Brand: 'ABC' , Action: 'Edit', name: 'Norton', category: 'Anti Virus', Status: 'Active', UniqueKey: 'View Details(23)' },
//   {id: 10, Brand: 'ABC' , Action: 'Edit', name: 'MacAfee', category: 'Anti Virus', Status: 'Active' , UniqueKey: 'View Details(35)' },
// ];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements  AfterViewInit , OnInit {

  displayedColumns: string[] = [ 'Brand' , 'name', 'category', 'status', 'productkey' , 'Action' ];

  public dataSource;


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private repoService: RepositoryService , public dialog: MatDialog ,public authService: AuthService) { }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.getAllOwners();

  }
  public getAllOwners = () => {
    this.repoService.getData('products')
    .subscribe( (res: any) => {
      console.log(res.data.data);
      this.dataSource = new MatTableDataSource(res.data.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

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
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event === 'AddAll') {
        this.updateAll(result.data);
      } else if (result.event === 'Upload Product File') {
        this.updateproduct(result.data);
      } });
  }

  public openDialogSmall(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open( DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result.event === 'product not found') {
        this.addRowData(result.data);
      } else if (result.event === 'Updatekey') {
        this.updateRowData(result.data);
      }  });
  }

 public addRowData( data: any ) {
     console.log(data);
     const bodydata = {
      itemName : data.itemName,
      sellerSku : data.sellerSku,
      quantity : data.quantity,
      category : data.category,
      status : data.status,
      ProductId : data.marketPlaceProductId,
      price : data.price
     };
     this.repoService.create('product/product', bodydata ).subscribe((res: any) => console.log(res));
    // this.table.renderRows();
     this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(data) {
     console.log(data);
     const bodydata = {
     itemName : data.itemName,
     sellerSku : data.sellerSku,
     quantity : data.quantity,
     category : data.category,
     status : data.status,
     ProductId : data.marketPlaceProductId,
     price : data.price
     };
     this.repoService.update('product/product/' + data.id , bodydata ).subscribe((res: any) => console.log(res));
     this.paginator._changePageSize(this.paginator.pageSize);
  }

  public updateAll(rowobj) {
    this.dataSource  = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        value.name = rowobj.name;
        value.Brand = rowobj.Brand;
        value.category = rowobj.category;
        value.Status = rowobj.Status ;
        value.UniqueKey = rowobj.UniqueKey;
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

  public updateproduct(data: any) {
    // const bodydata = JSON.parse(JSON.stringify(data));
    console.log( data);
    this.repoService.create('import/products', {'products' : data}).subscribe((res: any) => console.log(res));
    this.getAllOwners();
  }

  public delepredouct(element: any) {
    console.log(element.id);
    this.repoService.delete2('product/delete' , { id : element.id}  ).subscribe((res: any) => {
      this.openDialogSmall('productdeleted', element.name);
      console.log(res.data);
    });
  }

}
