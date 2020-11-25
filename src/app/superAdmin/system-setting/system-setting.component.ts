import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.scss']
})
export class SystemSettingComponent implements OnInit {
  times = ['20 min' , '30 min' , '50 min' ]

  constructor() { }

  ngOnInit() {
  }


}
