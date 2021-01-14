import { Component,  OnInit,
  ContentChildren,
  Input,
  AfterViewInit,
  QueryList,
  ViewChild,
  ContentChild,
  AfterContentInit, } from '@angular/core';


import { AuthService } from '../../shared/auth.services';
import {FormControl, FormGroup} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import {DecriptionService} from '../../shared/decription.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.scss']
})
export class VieworderComponent implements OnInit {

  displayedColumns: string[] = [
    'orderId',
    'sku',
    'buyerEmail',
    'quantityPurchased',
    'createdAt',
    'orderStatus',
    'Action',
  ];

  public dataSource ;
  public pagenumber = 1;
  public pagesize = 50;

  constructor(private repoService: RepositoryService,
              public dialog: MatDialog, public authService: AuthService,
              private Decription: DecriptionService) { }

  ngOnInit() {
    this.getAllOwners();
  }

  public getAllOwners = () => {
    this.repoService.getData('orders/' + this.pagenumber + '/' + this.pagesize).subscribe((res: any) => {
      if (res && res.data  && res.data.length > 0) {
        res.data.rows.forEach(element => {
            let Email = '';
            if (element.buyerEmail.length > 0) {
                Email = this.Decription.decript(element.buyerEmail);
            }
            element.email = Email;
        });
    }
      this.dataSource = new MatTableDataSource(res.data.rows);
    
    });
  }


}
