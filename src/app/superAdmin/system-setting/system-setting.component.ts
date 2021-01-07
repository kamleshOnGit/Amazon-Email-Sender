import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/servercomunication.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
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
  constructor(private repoService: RepositoryService,  public dialog: MatDialog ) { }
  popupmsg = {message: ''};
  ngOnInit() {
    this.getconfig();
  }
  public getconfig = () => {
    this.repoService.getData('globalSettings')
            .subscribe((res: any) => {this.formdata = res.data[0];
                                      console.log(res.data , this.formdata);
            } , error => {
              console.log(error.error.message);
              this.popupmsg.message =  error.error.message;
              this.openDialogSmall('mailsenterror', this.popupmsg);
            } );

}
public openDialogSmall(action, obj) {
  obj.action = action;
  const dialogRef = this.dialog.open( DialogBoxComponent, {
    width: '500px',
    data: obj
  });

  dialogRef.afterClosed().subscribe( (result) => {
    if (result && result.event === 'product not found') {
      // this.addRowData(result.data);
    } else if (result && result.event === 'Updatekey') {
      // this.updateRowData(result.data);
    }  });
}

public setconfig() {
  const bodydata = {
    schedulerMinutes : this.formdata.schedulerMinutes,
    emailHost : this.formdata.emailHost,
    emailPassword : this.formdata.emailPassword,
    emailPort : this.formdata.emailPort,
  };
  this.repoService.update('globalSettings/' + this.formdata.id , bodydata ).subscribe((res: any) => {
    this.popupmsg.message = res.message;
    this.openDialogSmall('adduser', this.popupmsg);
    console.log(res.data);
  } , error => {
    console.log(error.error.message);
    this.popupmsg.message =  error.error.message;
    this.openDialogSmall('mailsenterror', this.popupmsg);
  } );
}
}
