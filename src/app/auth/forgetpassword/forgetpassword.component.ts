import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../..//shared/servercomunication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.services';
import { Title } from '@angular/platform-browser';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  popupmsg =  '';
  username: string;
  password: string;
  forgetPassword: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private title: Title,
    public authService: AuthService, public service: RepositoryService) {
    this.forgetPassword = this.fb.group({
      email: [''],
      password: ['']     
    });
  }

  ngOnInit() {
    this.title.setTitle("Change Password");
  }
  get F() {
    return this.forgetPassword.controls;
  }
  createPassword($event) {
    
    this.service.create('changePassword',
        { email: this.username, newPassword: this.password }).subscribe((res: any) => 
    this.popupmsg = res.message);

  }

  // changePassword() {
  //   this.authService.doLogout();
  //   this.router.navigate(['']);
  // }
}
