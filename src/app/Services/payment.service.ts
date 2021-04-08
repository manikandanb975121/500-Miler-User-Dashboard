import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.prod';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  

  get nativeWindow() : any {
    return _window();
 }
 private orderId = new Subject<any>();
 constructor(private http:HttpClient){}

 getOrderId(orderId){

  this.http.post(`${environment.backendURL}/api/checkout`,orderId).subscribe(res=>{
    this.orderId.next(res)
  })
 
 }

 getUpdatesOrderId(){
  return this.orderId.asObservable();
}



  



}
