import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor() { }

 public model = { content : '...' } ;
 public config: any = {
    allowedContent: true,
    resize_enabled: false,
    placeholder: '',
    contentsCss: ['body {font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;}'],
  };
  ngOnInit() {
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

}
