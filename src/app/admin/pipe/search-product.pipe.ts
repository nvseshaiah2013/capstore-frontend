import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(productList: any, searchText: any): any {

    let newList: any;
    if (searchText) {
      newList = productList.filter(product =>  product.productName.toLowerCase().startsWith(searchText.toLowerCase()) );
    }
    else {
      newList = productList;
    }
    return newList;
  }

}
