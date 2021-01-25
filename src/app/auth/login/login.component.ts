import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../..//shared/servercomunication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.services';
import { Title, Meta } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/shared/password-strength.validator';
import { DialogBoxComponent } from 'src/app/shared/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';

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
  popupmsg = { message: '' };
  constructor(private title: Title, private router: Router, private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public dialog: MatDialog,) {
    this.signinForm = this.fb.group({
      email: ['',Validators.email],
      password: ['', Validators.compose([PasswordStrengthValidator, Validators.required, Validators.minLength(8), Validators.maxLength(50)])]
    });

  }
  public openDialogSmall(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });
  }
  ngOnInit() {
    this.title.setTitle("login");
  }

  get f() {
    return this.signinForm.controls;
  }
  loginUser() {
    this.authService.signIn(this.signinForm.value).then((res) => {

    }).catch(err => {
      this.popupmsg.message = err.error.message;
      this.openDialogSmall('loginError',this.popupmsg)
      // throw err;
    });
  }
}
