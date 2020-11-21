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

 public model = { content : 'Type the content of email template here here!' } ;
 public config: any = {
    allowedContent: true,
    resize_enabled: false,
    placeholder: 'Type the content of email template here here!',
    contentsCss: ['body {font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;}'],
  };
  ngOnInit() {
  }


  onChange({ editor }: ChangeEvent ) {
    const data = editor.getData();

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
