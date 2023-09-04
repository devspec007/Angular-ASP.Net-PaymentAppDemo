import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})

export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.service.refreshList()
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  deleteRecord(id: number) {
    console.log(id);
    this.service.deletePaymentDetail(id)
      .subscribe({
        next: res => {
          this.service.list = res as PaymentDetail[];
          this.toastr.error("deleted Successfully", "Payment Detail Register")
        },
        error: err => { console.log(err) }
      });
  }
}
