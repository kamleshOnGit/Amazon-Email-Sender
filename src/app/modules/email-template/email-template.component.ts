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
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
// import { EmailTemplateDialogBoxComponent  } from '../../shared/email-template-dialog-box/email-template-dialog-box.component';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'category', 'IsActive', 'createdAt', 'Action'];

  public dataSource = new MatTableDataSource([]);
  popupmsg = { message: '' };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private repoService: RepositoryService, public dialog: MatDialog, public router: Router, private title: Title) { }



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {

    this.title.setTitle("Email Template");
    this.getAllEmailTemplateList();

  }
  public getAllEmailTemplateList = () => {
    this.repoService.getData('emailTemplate')
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.popupmsg.message = error.error.message;
        this.openDialogSmall('mailsenterror', this.popupmsg);
      });
  }
  redirectTemplate(id: number) {
    this.repoService.id = id;
    this.router.navigate(['./edit-email-template']);
  }

  public openDialog(action, obj) {
    obj.action = action;
    if (action == "UploadEmail") {
      obj.IsActive = true;
    }
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
  public openDialogSmall(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  newemailtemplate(data: any) {

    const bodydata = {
      name: data.name,
      emailHtml: data.emailTemplate,
      status: data.status,
      comments: data.comments
    };
    this.repoService.create('emailTemplate', bodydata).subscribe((res: any) => {

      this.popupmsg.message = res.message;
      this.openDialogSmall('addemailtemplate', this.popupmsg);
      this.getAllEmailTemplateList();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }

  deleteTemplate(id: number) {
    this.repoService.delete1('emailTemplate/' + id).subscribe((res: any) => {
      this.popupmsg.message = res.message;
      this.openDialogSmall('deleteemailtemplate', this.popupmsg);
      this.getAllEmailTemplateList();
    }, error => {
      this.popupmsg.message = error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }

}
