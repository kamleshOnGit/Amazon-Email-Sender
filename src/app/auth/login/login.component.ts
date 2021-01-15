import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../..//shared/servercomunication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.services';
import { Title, Meta } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/shared/password-strength.validator';

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
  constructor(private title: Title, private router: Router, private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService) 
  {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['', Validators.compose([PasswordStrengthValidator, Validators.required, Validators.minLength(8), Validators.maxLength(50)])]
    });

  }

  ngOnInit() {
    this.title.setTitle("login");
  }

  get f() {
    return this.signinForm.controls;
  }
  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }
}
