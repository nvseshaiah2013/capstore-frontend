import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {

  searchText:string;
  view:boolean=true;
  addresses:any;
  name:string;
  customers:any;
  constructor(private service:AdminService) {
    this.service.getListOfCustomers().subscribe(data=>
      {
        this.customers=data
        console.log(data)
      })
      
   }

  ngOnInit() {
    
    
  }
  toggleViewList(){
    this.view=false;
  }
  toggleViewCard()
  {
    this.view=true;
  }
  
  viewAddress(username:string,name:string)
  {
    this.name=name
    this.service.getAddressByUsername(username).subscribe(data=>
      {
        console.log(data)
        this.addresses=data
      })
  }
  deleteAddress()
  {
    console.log("delete address")
  }
}
