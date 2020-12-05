import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RepositoryService} from '../../servercomunication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  role = 'Admin';
  constructor(private service: RepositoryService) { }

  ngOnInit() {
    this.role = this.service.role;
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
