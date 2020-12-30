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
import {ProductKeys} from '../../shared/uniqueKeys.model';

export interface PeriodicElement {
  id: number;
  Action: string;
  SKU: string;
  BatchCode: string;
  CodeAvailable: number;
  CodeUsed: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Action: 'Add New', SKU: 'MacAfee', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 2, Action: 'Add New', SKU: 'Nortan', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 3, Action: 'Add New', SKU: 'AVG', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 4, Action: 'Add New', SKU: 'MacAfee', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 5, Action: 'Add New', SKU: 'Nortan', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
  {id: 6, Action: 'Add New', SKU: 'AVG', BatchCode: 'Nov11Batch', CodeAvailable: 5 , CodeUsed: 12 },
];

@Component({
  selector: 'app-unique-keys',
  templateUrl: './unique-keys.component.html',
  styleUrls: ['./unique-keys.component.scss']
})
export class UniqueKeysComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['SKU', 'BatchCode', 'CodeAvailable', 'CodeUsed', 'Action'  ];

  dataSourceNew = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.dataSourceNew) ;
  codeUsed = 0;
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
    this.getAllOwners();
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
  }
  public getAllOwners = () => {
    this.repoService.getData('products')
            .subscribe((res: any) => {
                console.log(res.data.data);
                if (res && res.data && res.data.data && res.data.data.length > 0) {
                    res.data.data.forEach(element => {
                        let activeCount = 0;
                        let usedCount = 0;
                        if (element.productKeys.length > 0) {
                            activeCount = element.productKeys.filter(x => x.status === 'active').length;
                            usedCount = element.productKeys.filter(x => x.status === 'used').length;
                        }
                        element.activeCount = activeCount;
                        element.usedCount = usedCount;
                    });
                }
                this.dataSource = new MatTableDataSource(res.data.data);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            });
  }
  public getCodeUsed(data: any) {
     const arr = data.map((val) => val.productKeys.filter((valu) => valu.status === 'used')).flat(2);
     console.log( arr) ;
     this.codeUsed = arr.length;
  }
  public getCodeActive(data: any) {
    const arr = data.map((val) => val.productKeys.filter((valu) => valu.status === 'Active')).flat(2);
    console.log( arr) ;

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

 public addRowData( data) {
  console.log(data);
  const bodydata = {
    key : data.key,
    status : data.status,
    batch : data.batch,
    priority : data.priority,
    sku : data.sku,
  };
  this.repoService.create('product/productkey', bodydata ).subscribe((res: any) => console.log(res));
 // this.table.renderRows();
  this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateRowData(data) {
    console.log(data);
    const bodydata = {
    key : data.key,
    status : data.status,
    batch : data.batch,
    priority : data.priority,
    // sku : data.marketPlaceProductId,
    };
    this.repoService.update('product/productKey/' + data.id , bodydata ).subscribe((res: any) => console.log(res));
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public updateAll(rowobj) {
    this.dataSourceNew  = this.dataSourceNew .filter((value, key) => {
      if (value.id === rowobj.id) {
        value.SKU = rowobj.name;
        value.Action = rowobj.category;
        value.BatchCode = rowobj.IsActive ;
        value.CodeAvailable = rowobj.UniqueKey;
        value.CodeUsed = rowobj.CodeUsed;
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

  public updateproductKeys(data: any) {
    // const bodydata = JSON.parse(JSON.stringify(data));
    console.log( data);
    this.openDialogSmall('product not found', data.productnotfound);
    this.repoService.create('import/productskeys', {'productskey' : data}).subscribe((res: any) => console.log(res));
    // this.getAllOwners();

  }


}
