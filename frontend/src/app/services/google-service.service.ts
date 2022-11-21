import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleServiceService {

  // private auth2!: gapi.auth2.GoogleAuth
  // private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  constructor() {
    // gapi.load('auth2',()=>{
    //   '195459507866-o1t9va75316i86ssnelch85oqctnr2t5.apps.googleusercontent.com';
    // })
  }
  // public signIn(){
  //   this.auth2.signIn({
  //     scope: 'https://www.googleapis.com/auth/gmail.readonly'
  //   }).then((user)=>{
  //     this.subject.next(user)
  //   }).catch((error)=>{
      
  //   })
  // }

  // public signOut(){
  //   this.auth2.signOut().then(()=>{
    
  //   })
  // }
  
  // public observable():Observable<gapi.auth2.GoogleUser>{
  //   return this.subject.asObservable()
  // }
}
