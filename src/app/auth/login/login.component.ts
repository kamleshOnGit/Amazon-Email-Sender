import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RepositoryService} from '../..//shared/servercomunication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.services';
import { Title ,Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  username: string;
  password: string;
  userverify = 'Hrishi';
  passverify = '12345';
  superadmin = 'superadmin';
  superpass = '12345';
  wrongpass = false;
  constructor(private title :Title,private router: Router , private route: ActivatedRoute , public fb: FormBuilder,
              public authService: AuthService) {
                this.signinForm = this.fb.group({
                  email: [''],
                  password: ['']
                });

              }

  ngOnInit() {
    this.title.setTitle("login");
  }
  // onSubmit($event: any) {
  //   $event.preventDefault();
  //   if (this.username === this.userverify && this.password === this.passverify) {
  //     this.router.navigate(['admin'] ,  {relativeTo: this.route});
  //     this.wrongpass = false;
  //     this.services.role = 'admin';
  //   } else if (this.username === this.superadmin && this.password === this.superpass){ 
  //     this.router.navigate(['admin'] ,  {relativeTo: this.route});
  //     this.wrongpass = false;
  //     this.services.role = 'superadmin';
  //   } else {
  //     this.wrongpass = true;
  //   }
  // }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}
