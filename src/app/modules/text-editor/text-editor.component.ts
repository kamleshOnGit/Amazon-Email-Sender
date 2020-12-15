import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {ActivatedRoute , Params} from '@angular/router';
import { map } from 'rxjs/operators';
import { RepositoryService } from '../../shared/servercomunication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  public id;
  constructor( public route: ActivatedRoute , public location: Location , private repoService: RepositoryService, ) { }
 name: string;
 productid: string;
 selectcheck = false;
 selecttext = 'InActive';
 public model = { content : '' } ;
 public config: any = {
    allowedContent: true,
    resize_enabled: false,
    placeholder: '',
    contentsCss: ['body {font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;}'],
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

    });
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
    this.repoService.update('emailTemplate/' + this.id , bodytext ).subscribe((res: any) => console.log(res));
  }
}
