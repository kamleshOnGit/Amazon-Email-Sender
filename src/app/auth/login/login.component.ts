import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RepositoryService} from '../..//shared/servercomunication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  userverify = 'Hrishi';
  passverify = '12345';
  superadmin = 'superadmin';
  superpass = '12345';
  wrongpass = false;
  constructor(private router: Router , private route: ActivatedRoute , private services: RepositoryService) { }

  ngOnInit() {
  }
  onSubmit($event: any) {
    $event.preventDefault();
    if (this.username === this.userverify && this.password === this.passverify) {
      this.router.navigate(['admin'] ,  {relativeTo: this.route});
      this.wrongpass = false;
      this.services.role = 'admin';
    } else if (this.username === this.superadmin && this.password === this.superpass){ 
      this.router.navigate(['admin'] ,  {relativeTo: this.route});
      this.wrongpass = false;
      this.services.role = 'superadmin';
    } else {
      this.wrongpass = true;
    }
  }

}
