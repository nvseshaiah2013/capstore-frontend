import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCoupon'
})
export class FilterCouponPipe implements PipeTransform {

  transform(couponDeatil: any, searchText1: any): any {
    if (searchText1) {
      couponDeatil = couponDeatil.filter(user => user.couponCode.toLowerCase().startsWith(searchText1.toLowerCase()));
    }
    else {
      couponDeatil = couponDeatil;
    }
    return couponDeatil;
  }
  
}
