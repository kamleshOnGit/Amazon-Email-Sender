import { Component, OnInit , AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit , AfterViewInit {

  name = 'Angular';
  exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };


  displayedColumns: string[] = ['orderTime' , 'shipedAt', 'customerName', 'emailAddress', 'mobileNumber' ];
  dataSource = new MatTableDataSource([]) ;

  constructor( private title:Title) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  ngOnInit() {
    
    this.title.setTitle("Settings");
  }

  onChangeHour(event) {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
