import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../../servercomunication.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  role = 'admin';
  constructor(private service: RepositoryService) { }

  ngOnInit() {
    // this.role = this.service.role;
    this.role = 'admin';
  }

}
