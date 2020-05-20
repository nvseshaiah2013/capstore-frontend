import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMerchant'
})
export class SearchMerchantPipe implements PipeTransform {

  transform(merchantList: any, searchText: any): any {

    let newList: any;
    if (searchText) {
      newList = merchantList.filter(merchant =>  merchant.name.toLowerCase().startsWith(searchText.toLowerCase()) );
    }
    else {
      newList = merchantList;
    }
    return newList;
  }

}
