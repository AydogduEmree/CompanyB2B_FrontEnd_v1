import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UiRelationsService {

private logInNavbarUI: string='yes-ui';
  constructor( ) { //@Inject(String)
  }

  getlogInNavbarUI(){
    return this.logInNavbarUI;
  }
  setlogInNavbarUI(input:string){
    this.logInNavbarUI= input;
  }
}
