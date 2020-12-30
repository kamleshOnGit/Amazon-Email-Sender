import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RepositoryService} from '../..//shared/servercomunication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.services';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
 username: string;
 password: string;
 forgetPassword: FormGroup;

  constructor(private router: Router , private route: ActivatedRoute , public fb: FormBuilder,
              public authService: AuthService , public service: RepositoryService) {
                this.forgetPassword = this.fb.group({
                  email: [''],
                  password: ['']
                });
              }

  ngOnInit() {
  }

  createPassword($event) {
    console.log(this.username , this.password);

    this.service.create('changePassword' , {email : this.username , newPassword: this.password}).subscribe(res => console.log(res));
  }
  changePassword() {
    this.authService.doLogout();
    this.router.navigate(['']);
  }
}
