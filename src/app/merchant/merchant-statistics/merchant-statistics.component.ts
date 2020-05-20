import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MerchantService } from '../services/merchant.service';
import { Customer } from 'src/app/models/customer.model';
import { Orders } from 'src/app/models/order.model';

@Component({
  selector: 'app-merchant-statistics',
  templateUrl: './merchant-statistics.component.html',
  styleUrls: ['./merchant-statistics.component.css']
})
export class MerchantStatisticsComponent implements OnInit {

  chart = [];
  date = [];
  recentRevenues;
  recentOrdersCount;
  category = ['Clothes', 'Home', 'FootWear', 'Electronics']
  categoryOrders = [1, 1, 1, 1];
  males: number = 1;
  females: number = 1;
  others: number = 1;
  customers: Customer[] = new Array();
  orders: Orders[];

  constructor(private merchantService : MerchantService) { 
    this.date.push("17/05/20");
    this.date.push("16/05/20");
    this.date.push("15/05/20");
    this.date.push("14/05/20");
    this.date.push("13/05/20");
    this.date.push("12/05/20");
    this.date.push("11/05/20");
  }

  ngOnInit() {
    this.merchantService.getMerchantOrders().subscribe(data => {
      this.orders = data;
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].product.subCategory.category.name == "Clothes") {
          this.categoryOrders[0] += 1
        }
        if (this.orders[i].product.subCategory.category.name == "Home") {
          this.categoryOrders[1] += 1
        }
        if (this.orders[i].product.subCategory.category.name == "FootWear") {
          this.categoryOrders[2] += 1
        }
        if (this.orders[i].product.subCategory.category.name == "Electronics") {
          this.categoryOrders[2] += 1
        }
      }

      this.chart = new Chart('categoryChart', {
        type: 'pie',
        data: {
          labels: this.category,
          datasets: [
            {
              label: 'Category Wise Orders',
              backgroundColor: ['#878BB6', '#4ACAB4', '#FF8153', '#FFEA88'],
              borderColor: ['#878BB6', '#4ACAB4', '#FF8153', '#FFEA88'],
              data: this.categoryOrders,
              fill: true,
            }
          ]
        }
      })
    })


    this.merchantService.getMerchantOrders().subscribe(data => {
      data.forEach(order => this.customers.push(order.customer));
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].gender == 'Male') {
          this.males += 1;
        }
        else if (this.customers[i].gender == 'Female') {
          this.females += 1;
        }
        else {
          this.others += 1;
        }
      }
      this.chart = new Chart('genderChart', {
        type: 'doughnut',
        data: {
          labels: ['Male', 'Female', 'Others'],
          datasets: [
            {
              label: 'Gender wise Customer',
              backgroundColor: ['#FF8153', '#66bb6a', '#FFEA88'],
              borderColor: ['#FF8153', '#66bb6a', '#FFEA88'],
              data: [this.males, this.females, this.others],
              fill: true,
            }
          ]
        }
      })
    })

    this.merchantService.getMerchantOrders().subscribe(data => {
      this.recentRevenues = data.map(order => order.transaction.transactionMoney);;

      this.chart = new Chart('revenueChart', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'Total Revenue (in INR) - Last 7 Days',
              backgroundColor: '#66bb6a',
              borderColor: '#66bb6a',
              data: this.recentRevenues,
              fill: false,
            }
          ]
        }
      })
    })

  }

}
