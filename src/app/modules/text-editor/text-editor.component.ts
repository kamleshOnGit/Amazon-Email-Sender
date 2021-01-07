import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {ActivatedRoute , Params} from '@angular/router';
import { map } from 'rxjs/operators';
import { RepositoryService } from '../../shared/servercomunication.service';
import { Location } from '@angular/common';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit {
  popupmsg = {message: ''};
  public Editor = ClassicEditor;
  public id;
  constructor( public route: ActivatedRoute , public location: Location ,
               private repoService: RepositoryService, public dialog: MatDialog, ) { }
 name: string;
 productid: string;
 selectcheck = false;
 selecttext = 'InActive';
 public model = { content : '' } ;
 public config: any = {
    allowedContent: true,
    resize_enabled: false,
    placeholder: '',
    contentsCss: ['body {font-family: "Proxima Nova",sans-serif;}'],
  };
  ngOnInit() {
    // this.id = +this.route.snapshot.params[0].id;
    this.id = this.repoService.id;
    console.log(this.repoService.id);
    this.getAllOwners();
  }

  public getAllOwners = () => {
    this.repoService.getData('emailTemplate/' + this.id).subscribe((res: any) => {
      const template: string = res.data.data.emailHtml ;
      // console.log(res.data.data , template);
      this.name = res.data.data.name;
      this.productid = res.data.data.productId;
      this.model.content =  template ;

    }, error => {
      console.log(error.error.message);
      this.popupmsg.message =  error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }


  public openDialogSmall(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open( DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result && result.event === 'product not found') {
        // this.addRowData(result.data);
      } else if (result && result.event === 'Updatekey') {
        // this.updateRowData(result.data);
      }  });
  }
  onChange($event) {
    const data = $event;

    console.log( data );
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
  updateIsActive() {
    if (this.selectcheck === true) {
      this.selecttext = 'Active';
    } else {
      this.selecttext = 'InActive';
    }
  }

  updateEmailTemplate() {
    const bodytext = {
      productId : this.productid,
      name : this.name,
      emailHtml : this.model.content,
      status : this.selecttext,
      comments : 'text'
    };
    this.repoService.update('emailTemplate/' + this.id , bodytext ).subscribe((res: any) => {
    console.log( res);
    this.popupmsg.message = res.message;
    this.openDialogSmall('updateemailtemplate', this.popupmsg);
    }, error => {
      console.log(error.error.message);
      this.popupmsg.message =  error.error.message;
      this.openDialogSmall('mailsenterror', this.popupmsg);
    });
  }
}
