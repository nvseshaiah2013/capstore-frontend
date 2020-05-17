import { Merchant } from './merchant.model';
import { SubCategory } from './subCategory.model';

export class Product{
    productId:number;
    productName:string;
    productImage:string;
    productPrice:number;
    productRating:number;
    noOfViews:number;
    productBrand:string;
    noOfProducts:number;
    productInfo:string;
    discount:number;
    productActivated:boolean;
    isFeatured:boolean;
    merchant:Merchant;
    subCategory:SubCategory;
}