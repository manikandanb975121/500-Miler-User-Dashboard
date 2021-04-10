import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  rzp1;
  options = {
    "key": "rzp_test_KWmuBtFnG86iyt",
    "amount": "",
    "currency": "INR",
    "name": "500 Miler",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "",
    "modal": {
      "escape": false,
    },
    "handler":function (response){
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
  },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };

  constructor(private payment:PaymentService) { }

  ngOnInit(): void {
  }
 
  pay(){
    let orderId = {
      amount :100000
    }
    this.payment.getOrderId(orderId);
    this.payment.getUpdatesOrderId().subscribe(res=>{
      console.log(res);
      this.options.order_id = res.id;
      this.options.amount = res.amount;
      this.executePayment();
      
    }) 
  }

  executePayment(){
    this.rzp1 = new this.payment.nativeWindow.Razorpay(this.options);
    this.rzp1.on('payment.failed', function (response){
      console.log(response);
    });
    this.rzp1.open();
  }

  

  
 

}
