import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.scss']
})
export class RegistorComponent implements OnInit {
  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }
 onSubmit($event) {

 }
}
