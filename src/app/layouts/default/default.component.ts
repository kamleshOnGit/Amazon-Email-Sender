import { Component, OnInit } from '@angular/core';
import { Title ,Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor(
    private title:Title
  ) { }

  ngOnInit() {    
    this.title.setTitle("Dashboard");
   }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
