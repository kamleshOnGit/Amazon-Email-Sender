import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../..//shared/servercomunication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.services';
import { Title } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/shared/password-strength.validator';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  popupmsg = '';
  forgetPassword: FormGroup;
  submitted: false;

  constructor(private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private title: Title,
    public authService: AuthService, public service: RepositoryService) {
    this.forgetPassword = this.fb.group({
      email: [''],
      newPassword: ['', Validators.compose([PasswordStrengthValidator, Validators.required, Validators.minLength(8), Validators.maxLength(50)])]
    });
  }

  ngOnInit() {
    this.title.setTitle("Change Password");
  }
  get f() {
    return this.forgetPassword.controls;
  }
  createPassword($event) {
    this.service.create('changePassword',this.forgetPassword.value).subscribe((res: any) =>
        this.popupmsg = res.message);

  }

  // changePassword() {
  //   this.authService.doLogout();
  //   this.router.navigate(['']);
  // }
}
