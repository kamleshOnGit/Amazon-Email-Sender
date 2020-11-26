import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
 username: string;
 password: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit($event) {

  }

}
