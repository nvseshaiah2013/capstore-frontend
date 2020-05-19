import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Address } from 'src/app/models/address.model';
import { LoaderService } from '../services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {

  searchText: string;
  view: boolean = true;
  addresses: Address[];
  username:string
  name: string;
  customers: any;
  constructor(private service: AdminService,private loaderService:LoaderService,private router:Router) {
    

  }

  ngOnInit() {
    this.service.getListOfCustomers().subscribe(data => {
      this.customers = data
      this.loaderService.hide();
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
      this.loaderService.hide();
    })

  }
  toggleViewList() {
    this.view = false;
  }
  toggleViewCard() {
    this.view = true;
  }

  viewAddress(username: string, name: string) {
    this.username=username
    this.name = name
    this.service.getAddressByUsername(username).subscribe(data => {
      console.log(data)
      this.addresses = data
    })
  }
  deleteAddress(addressId:number) {
    console.log(addressId+" "+this.username)
  }
  ngOnDestroy(){
    this.loaderService.show();
  }
}
