import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AdminService } from '../services/admin.service';
import { customer } from 'src/app/models/customer.model';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  chart = [];

  date = ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"];
  totalRevenue = [4000, 2000, 3000, 7000, 2500, 4250, 6000];
  noOfOrders = [4, 6, 10, 7, 12, 3, 8];
  category = ["Category1", "Category2", "Category3", "Category4"];
  categoryOrders = [5, 2, 7, 8,];
  males: number = 0;
  females: number = 0;
  customers: customer[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.adminService.getListOfCustomers().subscribe(data => {
      this.customers = data;
      for (let i = 0; i < this.customers.length; i++) {
        console.log(this.customers[i].gender)
        if (this.customers[i].gender == 'M') {
          this.males = this.males + 1;
        }
        else {
          this.females += 1;
        }
      }
      this.chart = new Chart('genderChart', {
        type: 'doughnut',
        data: {
          labels: ['Male', 'Female'],
          datasets: [
            {
              label: 'Gender wise Customer',
              backgroundColor: ['orange', 'green'],
              borderColor: ['orange', 'green'],
              data: [this.males, this.females],
              fill: true,
            }
          ]
        }
      })
    })


}
}