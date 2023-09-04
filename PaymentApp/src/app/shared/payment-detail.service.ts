import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";

import { environment } from 'src/environments/environment';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})

export class PaymentDetailService {

  constructor(private http: HttpClient) { }

  url: string = environment.apiBaseUrl + '/PaymentDetail'
  list: PaymentDetail[] = [];
  formData: PaymentDetail = new PaymentDetail();

  refreshList(){
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as PaymentDetail[];
        },
        error: error => { console.log(error) }
      })
  }

  postPaymentDetail(){
    return this.http.post(this.url, this.formData)
  }
  putPaymentDetail(){
    return this.http.put(this.url + '/' + this.formData.paymentDetailId, this.formData);
  }
  deletePaymentDetail(id: number) {
    return this.http.delete(this.url + '/' + id)
  }
  resetForm(form: NgForm){
    form.form.reset()
    this.formData = new PaymentDetail();
  }
}
