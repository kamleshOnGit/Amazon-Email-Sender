import { Component } from '@angular/core';
import { version } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  
  constructor(){
    console.log("version(0.1)");
  }
}
