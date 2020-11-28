import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router , private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onSubmit($event: any) {
    $event.preventDefault();
    if (this.username === this.userverify && this.password === this.passverify) {
      this.router.navigate(['admin'] ,  {relativeTo: this.route});
    }
  }

}
