import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class DecriptionService {

  constructor() { }

  encript(text) {
    const chars = { '/': 'Por21Ld' };
    const crypted = CryptoJS.AES.encrypt(JSON.stringify({ text }), 'amazonseller').toString();
    let ciphertext = '';
    if (crypted.indexOf('/') === -1) {
      ciphertext = crypted;
    } else {
      ciphertext = crypted.replace(/[/]/g, m => chars[m]);
      return ciphertext;
    }
  }
  decript(text) {
    const chars = { 'Por21Ld': '/' };
    let newitem;
    if (text.indexOf('Por21Ld') === -1) {
      newitem = text;
    } else {
      newitem = text.replace(/Por21Ld/g, m => chars[m]);
    }
    const bytes = CryptoJS.AES.decrypt(newitem, 'amazonseller').toString(CryptoJS.enc.Utf8);
    const info3 = JSON.parse(bytes);
    const originalText = info3.text;
    return originalText;

  }

}
