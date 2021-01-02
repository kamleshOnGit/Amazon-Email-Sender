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


@Component({
  selector: 'app-viewuniques',
  templateUrl: './viewuniques.component.html',
  styleUrls: ['./viewuniques.component.scss']
})
export class ViewuniquesComponent implements OnInit {
  displayedColumns: string[] = [ 'BatchCode', 'Status', 'Priority', 'Action'  ];

  // dataSourceNew = ELEMENT_DATA;
  dataSource ;
  codeUsed = 0;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private repoService: RepositoryService , public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllOwners();
    this.dataSource = new MatTableDataSource(this.dataSource);
  }

  public getAllOwners = () => {
    this.repoService.create('productkeys/sku', {sku : 'K7_EM_IS_1U_1Y1' , pageNumber: 1, pageSize: 50})
            .subscribe((res: any) => {
                console.log(res.data);
                this.dataSource = new MatTableDataSource(res.data.data.rows);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            });
  }


 public openDialog(action, obj) {
  obj.action = action;
  const dialogRef = this.dialog.open( DialogBoxComponent, {
    width: '1000px',

    data: obj
  });



}
}
