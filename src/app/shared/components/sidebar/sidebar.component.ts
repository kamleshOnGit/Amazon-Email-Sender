import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.services';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  role = 'admin';

  constructor(private service: AuthService) { }
  ngOnInit() {
    this.role = this.service.getRole() ;

  }

}

