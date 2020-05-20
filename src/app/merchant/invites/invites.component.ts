import { Component, OnInit , OnDestroy } from '@angular/core';
import { Invitation } from 'src/app/models/invitation.model';
import { Router } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit , OnDestroy {

  invitations:Invitation[] = [];
  constructor(private router:Router,private merchantService:MerchantService,private loaderService:LoadingSpinnerService) { }

  ngOnInit() {
    this.merchantService.getMerchantInvites().subscribe(invites=>{
      this.invitations = invites;
      this.loaderService.hide();
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
      this.loaderService.hide();
    })
  }

  counter(i:number){
    return new Array(i);
  }

  ngOnDestroy(){
    this.loaderService.show();
  }

}
