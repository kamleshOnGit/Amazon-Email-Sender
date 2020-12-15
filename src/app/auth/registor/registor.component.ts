import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.scss']
})
export class RegistorComponent implements OnInit {
  username: string;
  password: string;
  signupForm: FormGroup;
  constructor(private router: Router , private route: ActivatedRoute , public fb: FormBuilder,
              public authService: AuthService) {

    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: ['']
    });
   }

  ngOnInit() {
  }
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['']);
      }
    })
  }
}
