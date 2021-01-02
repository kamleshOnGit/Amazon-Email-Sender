import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/servercomunication.service';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.scss']
})
export class SystemSettingComponent implements OnInit {
  // times = ['20 min' , '30 min' , '50 min' ]
  formdata: any = {
    id: '1'
  };
  constructor(private repoService: RepositoryService ) { }

  ngOnInit() {
    this.getconfig();
  }
  public getconfig = () => {
    this.repoService.getData('globalSettings')
            .subscribe((res: any) => {this.formdata = res.data[0];
                                      console.log(res.data , this.formdata);
            } );

}

public setconfig() {
  const bodydata = {
    schedulerMinutes : this.formdata.schedulerMinutes,
    emailHost : this.formdata.emailHost,
    emailPassword : this.formdata.emailPassword,
    emailPort : this.formdata.emailPort,
  };
  this.repoService.update('globalSettings/' + this.formdata.id , bodydata ).subscribe((res: any) => console.log(res));
}
}
