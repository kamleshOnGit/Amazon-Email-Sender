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

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.scss']
})
export class ViewproductsComponent implements OnInit {

  displayedColumns: string[] = [ 'Brand' , 'name', 'category', 'status', 'productkey' , 'Action' ];

  public dataSource;


  constructor(private repoService: RepositoryService , public dialog: MatDialog ,public authService: AuthService) { }

  ngOnInit() {
    this.getAllOwners();

  }
  public getAllOwners = () => {
    this.repoService.getData('products')
    .subscribe( (res: any) => {
      console.log(res.data.data);
      this.dataSource = new MatTableDataSource(res.data.data);

    });
  }
 
}
