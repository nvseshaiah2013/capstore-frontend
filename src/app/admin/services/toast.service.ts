import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})
export class ToastService {

  error:any;
  success:any;
  private successToast = new BehaviorSubject<boolean>(false);
  private successState = this.successToast.asObservable();
  private failToast = new BehaviorSubject<boolean>(false);
  private failState = this.failToast.asObservable();
  constructor() { }

  hideSuccess(){
    this.successToast.next(<boolean>false);
  }

  hideFail(){
    this.failToast.next(<boolean>false);
  }

  showSuccess() {
    this.successToast.next(<boolean>true);
  }

  showFail(){
    this.failToast.next(<boolean>true);
  }
 

  getSuccessState() {
    return this.successState;
  }

  getFailState(){
    return this.failState;
  }

  getError() {
    return this.error;
  }

  setError(error) {
    this.error = error;
  }
  getSuccess() {
    return this.success;
  }

  setSuccess(success) {
     this.success = success;
  }
}
