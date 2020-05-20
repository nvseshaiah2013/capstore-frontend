import { Component, OnInit , OnDestroy } from '@angular/core';
import { Invitation } from 'src/app/models/invitation.model';
import { Router, NavigationEnd } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit , OnDestroy {

  invitations:Invitation[] = [];
  private routeSubscription:Subscription;
  constructor(private router:Router,private merchantService:MerchantService,private loaderService:LoadingSpinnerService) { 
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
    this.routeSubscription.unsubscribe();
  }

  acceptInvite(invite:Invitation){
    this.loaderService.show();
    this.merchantService.acceptInvite(invite.id).subscribe(data=>{
      this.loaderService.hide();
      this.router.navigate(['merchant','invites']);
    },(err:HttpErrorResponse)=>{
      this.router.navigate(['error']);
      this.loaderService.hide();
    })
  }

  rejectInvite(invite:Invitation){
    this.loaderService.show();
    this.merchantService.rejectInvite(invite.id).subscribe(data => {
      this.loaderService.hide();
      this.router.navigate(['merchant','invites']);
    }, (err:HttpErrorResponse) => {
      if(err.status == 0){
        this.router.navigate(['error'])
      }
      this.loaderService.hide();
    })

  }
 
}
