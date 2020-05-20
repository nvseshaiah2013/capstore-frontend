import { Merchant } from './merchant.model';

export class Invitation{
    id:number;
    header:string;
    message:string;
    merchant:Merchant;
    date:Date;
    isAccepted:number;
}