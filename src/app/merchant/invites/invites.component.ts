import { Component, OnInit } from '@angular/core';
import { Invitation } from 'src/app/models/invitation.model';
import { Router } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

  invitations:Invitation[] = [];
  constructor(private router:Router,private merchantService:MerchantService) { }

  ngOnInit() {
    this.merchantService.getMerchantInvites('harsha98').subscribe(invites=>{
      this.invitations = invites;
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
    })
  }

  counter(i:number){
    return new Array(i);
  }
}
