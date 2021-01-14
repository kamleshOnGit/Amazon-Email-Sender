import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-manual-order-processing',
  templateUrl: './manual-order-processing.component.html',
  styleUrls: ['./manual-order-processing.component.scss']
})
export class ManualOrderProcessingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Vendorname', 'Pendingorder', 'Uplodorder', 'Procesorder'];

  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    // this.getAllOwners();
    this.dataSource = new MatTableDataSource([]);
  }

}
