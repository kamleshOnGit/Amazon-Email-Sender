import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { DecriptionService } from '../../shared/decription.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {


  displayedColumns: string[] = [
    'orderId',
    'buyerName',
    'buyerEmail',
    'buyerPhoneNumber',
  ];

  public allorder;
  public orderId;
  public data = [];
  public dataSource;
  public pagenumber = 1;
  public pagesize = 50;

  constructor(private repoService: RepositoryService,
    public dialog: MatDialog,
    private Decription: DecriptionService) { }

  ngOnInit() {
    this.dataSource = [];
    this.getAllOwners();
  }

  public getAllOwners = () => {
    this.repoService.getData('orders/' + this.pagenumber + '/' + this.pagesize).subscribe((res: any) => {
      this.allorder = res.data.rows;
    });
  }
  public selectedValue(event: MatSelectChange) {
    this.orderId = event.value.orderId;
    this.getCustomerInfo();
  }

  public getCustomerInfo() {
    this.repoService.create('order/customer/info/', { orderId: String(this.orderId) }).subscribe((res: any) => {
      this.data.push(res.data);
      this.dataSource = new MatTableDataSource(this.data);
    }
    );
  }

}
