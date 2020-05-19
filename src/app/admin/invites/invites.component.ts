import { Component, OnInit, OnDestroy } from '@angular/core';
import { InviteService } from '../services/invite.service';
import { Invitation } from '../../models/invitation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Merchant } from '../../models/merchant.model';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit,OnDestroy {

  invitations:Invitation[] = [];
  merchant:Merchant;
  constructor(private inviteService:InviteService,private router:Router,private loadingService:LoaderService) { }

  ngOnInit() {
    // this.loadingService.show();
    this.inviteService.getInvites().subscribe(invites=>{
      this.invitations = invites;
      this.loadingService.hide();
    },
    (err:HttpErrorResponse)=>{
      this.loadingService.hide();
      if(err.status == 0)
        this.router.navigate(['error']);
    })
  }
  setMerchant(merchant){
    this.merchant = merchant;
  }

  counter(i:number){
    return new Array(i);
  }
  ngOnDestroy(){
    this.loadingService.show();
  }
}
