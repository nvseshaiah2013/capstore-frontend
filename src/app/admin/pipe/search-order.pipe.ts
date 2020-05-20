import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOrder'
})
export class SearchOrderPipe implements PipeTransform {

  transform(orderList: any, searchText: any): any {

    let newList: any;
    if (searchText) {
      newList = orderList.filter(order =>
        order.orderId.toString().toLowerCase().startsWith(searchText.toLowerCase()));
    }
    else {
      newList = orderList;
    }
    return newList;
  }

}
