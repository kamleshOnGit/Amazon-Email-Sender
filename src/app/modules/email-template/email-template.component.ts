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
import { Router } from '@angular/router';
// import { EmailTemplateDialogBoxComponent  } from '../../shared/email-template-dialog-box/email-template-dialog-box.component';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';

export interface PeriodicElement {
  id: number;
  Action: string;
  name: string;
  category: string;
  IsActive: string;
  status: string;
  createdAt: string;
  emailHtml: string;
  productId: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {id: 1, Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '11 Nov 20' },
//   {id: 2,  Action: 'Edit/Delete', tamplateName: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '18 Oct 20' },
//   {id: 3,  Action: 'Edit/Delete', tamplateName: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '20 July 20' },
//   {id: 4,  Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '14 April 20' },
//   {id: 5,  Action: 'Edit/Delete', tamplateName: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '16 Sept 20' },
//   {id: 6,  Action: 'Edit/Delete', tamplateName: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '23 Aug 20' },
//   {id: 7,  Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '28 June 20' },
//   {id: 8,  Action: 'Edit/Delete', tamplateName: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '25 Jan 20' },
//   {id: 9,  Action: 'Edit/Delete', tamplateName: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '22 March 20' },
//   {id: 10,  Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '15 Feb 20' },
// ];



@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit , AfterViewInit {



  displayedColumns: string[] = [ 'name', 'category', 'IsActive', 'createdAt', 'Action' ];

  public dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private repoService: RepositoryService , public dialog: MatDialog, public router: Router ) { }



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.getAllOwners();

  }
  public getAllOwners = () => {
    this.repoService.getData('emailTemplate')
    .subscribe( (res: any ) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res.data);
    });
  }
  public redirectToDetails = (id: string) => {
  }
  public redirectToUpdate = (id: string) => {
  }
  public redirectToDelete = (id: string) => {
  }
  redirectTemplate(id: number ) {
    this.repoService.id = id ;
    this.router.navigate(['/admin/edit-email-template']);
  }

  public openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'UploadEmail') {
        this.newemailtemplate(result.data);
      }
    });
  }

 newemailtemplate(data: any) {

    const bodydata = {
      productId : data.productId,
      name : data.name,
      emailHtml: data.emailTemplate,
      status : data.status,
      comments : data.comments
    };
    console.log(data , bodydata);
    this.repoService.create('emailTemplate' , bodydata).subscribe((res: any) => console.log( res));
}

deleteTemplate(id: number) {
  this.repoService.delete1('emailTemplate/' + id).subscribe((res: any) => console.log( res));
}

}
