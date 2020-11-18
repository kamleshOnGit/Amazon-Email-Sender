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
// import { EmailTemplateDialogBoxComponent  } from '../../shared/email-template-dialog-box/email-template-dialog-box.component';



export interface PeriodicElement {
  id: number;
  Action: string;
  tamplateName: string;
  category: string;
  IsActive: string;
  DateModified: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '11 Nov 20' },
  {id: 2,  Action: 'Edit/Delete', tamplateName: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '18 Oct 20' },
  {id: 3,  Action: 'Edit/Delete', tamplateName: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '20 July 20' },
  {id: 4,  Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '14 April 20' },
  {id: 5,  Action: 'Edit/Delete', tamplateName: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '16 Sept 20' },
  {id: 6,  Action: 'Edit/Delete', tamplateName: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '23 Aug 20' },
  {id: 7,  Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '28 June 20' },
  {id: 8,  Action: 'Edit/Delete', tamplateName: 'AvG', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '25 Jan 20' },
  {id: 9,  Action: 'Edit/Delete', tamplateName: 'Norton', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '22 March 20' },
  {id: 10,  Action: 'Edit/Delete', tamplateName: 'MacAfee', category: 'Anti Virus', IsActive: 'Yes' , DateModified: '15 Feb 20' },
];


 

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit , AfterViewInit {
  
  content = '<p>Some html</p>';
  config: any = {
    allowedContent: true,
    toolbar: [['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', 'Link', '-', 'CreatePlaceholder']],
    removePlugins: 'elementspath',
    resize_enabled: false,
    extraPlugins: 'font,divarea,placeholder',
    contentsCss: ['body {font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;}'],
    autoParagraph: false,
    enterMode: 2
  };

  displayedColumns: string[] = ['Action', 'tamplateName', 'category', 'IsActive', 'DateModified'];

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
  public getAllOwners = () => {
    this.repoService.getData('api/owner')
    .subscribe(res => {
      this.dataSourceNew  = res as PeriodicElement[];
    });
  }
  public redirectToDetails = (id: string) => {
  }
  public redirectToUpdate = (id: string) => {
  }
  public redirectToDelete = (id: string) => {
  }
  onChange($event) {

  }

  onEditorChange($event) {

  }
  onReady($event) {
  }
  onFocus($event) {

  }
  onBlur($event) {

  }
  onContentDom($event) {

  }

  onFileUploadRequest($event) {

  }

  onFileUploadResponse($event) {

  }
  onPaste($event) {

  }
  onDrop($event) {

  }

}
