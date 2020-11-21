import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
declare let Email;

@Component({
  selector: 'app-send-manual-email',
  templateUrl: './send-manual-email.component.html',
  styleUrls: ['./send-manual-email.component.scss']
})
export class SendManualEmailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {

    Email.send({
      SecureToken : 'C973D7AD-F097-4B95-91F4-40ABC5567812',
      To : 'them@website.com',
      From : 'you@isp.com',
      Subject : 'his is the subject',
      Body : 'And this is the body',
    Attachments : [
    {
      name : 'mtpjs.png',
      path : 'https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png'
    }]
  }).then(
    message => alert(message)
  );

    }


}
