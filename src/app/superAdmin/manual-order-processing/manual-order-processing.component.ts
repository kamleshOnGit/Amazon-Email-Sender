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
  Vendorname: string;
  Pendingorder: string;
  Uplodorder: string;
  Procesorder: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Vendorname: 'Vendor1', Pendingorder: '40', Uplodorder : 'Yes' , Procesorder: 'Send Email' },
  {id: 1, Vendorname: 'Vendor1', Pendingorder: '40', Uplodorder : 'Yes' , Procesorder: 'Send Email' },
  {id: 1, Vendorname: 'Vendor1', Pendingorder: '40', Uplodorder : 'Yes' , Procesorder: 'Send Email' },
  {id: 1, Vendorname: 'Vendor1', Pendingorder: '40', Uplodorder : 'Yes' , Procesorder: 'Send Email' },
  {id: 1, Vendorname: 'Vendor1', Pendingorder: '40', Uplodorder : 'Yes' , Procesorder: 'Send Email' },
  {id: 1, Vendorname: 'Vendor1', Pendingorder: '40', Uplodorder : 'Yes' , Procesorder: 'Send Email' },
  {id: 1, Vendorname: 'Vendor1', Pendingorder: '40', Uplodorder : 'Yes' , Procesorder: 'Send Email' },
];

@Component({
  selector: 'app-manual-order-processing',
  templateUrl: './manual-order-processing.component.html',
  styleUrls: ['./manual-order-processing.component.scss']
})
export class ManualOrderProcessingComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['Vendorname', 'Pendingorder', 'Uplodorder', 'Procesorder' ];

  dataSourceNew = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.dataSourceNew) ;

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
    // this.getAllOwners();
    this.dataSource = new MatTableDataSource(this.dataSourceNew);
  }

}
