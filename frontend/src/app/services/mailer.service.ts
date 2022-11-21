import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  apiUrl = environment.apiUrl;

  constructor(private _httpclient: HttpClient) { }

  sendEmailApiUrl = this.apiUrl+'/api/mailers/mailer';

  sendEmail(data: any){
    return this._httpclient.post(`${this.sendEmailApiUrl}`,data);
  }
}
