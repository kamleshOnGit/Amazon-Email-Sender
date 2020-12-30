import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../auth.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  role ;
  constructor(private service: AuthService , private router: Router , private route: ActivatedRoute ) { }

  ngOnInit() {
    this.role = this.service.currentUser;
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {
    this.service.doLogout();
    this.router.navigate(['']);
  }
  changepass() {
    this.router.navigate(['/forgetpassword']);
  }

}
