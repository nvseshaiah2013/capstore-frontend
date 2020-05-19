import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Orders } from '../../models/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  submitted: boolean = false;
  orders: Orders[];
  orders1: Orders[];
  index: number = 0;
  message: string = "";
  checkCoupon: boolean = true;
  error: string = "";
  checkError: boolean = false;
  checkAvailable: boolean[] = [];
  private routeSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: AdminService, private loaderService: LoaderService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.loaderService.show();
    this.editForm = this.formBuilder.group({
      status: ['', Validators.required]
    });

    this.service.getAllOrders().subscribe(data => {
      this.orders = data;
      this.orders1 = data;
      this.loaderService.hide();

      for (let i = 0; i < this.orders1.length; i++) {
        if (this.orders1[i].orderStatus == "Placed" || this.orders1[i].orderStatus == "Cancelled" || this.orders1[i].orderStatus == "Returned") {
          this.checkAvailable[i] = false;
        }
        else {
          this.checkAvailable[i] = true;
        }
      }
    }, err => {
      this.loaderService.hide();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.loaderService.show();
  }
  getIndex(index: number) {
    this.index = index + 1;
  }

  chooseAction(event: any) {
    let value = event.target.value;
    this.orders = this.orders1.filter(user => user.orderStatus == value);
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].orderStatus == "Placed" || this.orders[i].orderStatus == "Cancelled" || this.orders[i].orderStatus == "Returned") {
        this.checkAvailable[i] = false;
      }
      else {
        this.checkAvailable[i] = true;
      }
    }
    this.index = 0;
  }

  clearFilter() {
    this.orders = this.orders1;
    this.index = 0;
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].orderStatus == "Placed" || this.orders[i].orderStatus == "Cancelled" || this.orders[i].orderStatus == "Returned") {
        this.checkAvailable[i] = false;
      }
      else {
        this.checkAvailable[i] = true;
      }
    }
  }

  updateStatus() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    let status = this.editForm.controls.status.value;
    let orderId = this.orders[this.index - 1].orderId;

    this.service.updateOrderStatus(orderId, status).subscribe(data => {
      this.checkError = false;
      this.message = data.message;
      $('#orderModalCenter').modal('hide');
      this.router.navigate(['admin', 'orders']);
    }, (err: HttpErrorResponse) => {
      this.error = err.error.message;
      setTimeout(() => { $('#orderModalCenter').modal('hide'); }, 4000);
      this.checkError = true;
    });


  }

}