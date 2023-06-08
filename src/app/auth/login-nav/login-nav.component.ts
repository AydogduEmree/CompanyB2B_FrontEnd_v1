import { Component } from '@angular/core';

@Component({
  selector: 'login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.css']
})
export class LoginNavComponent {
  wId:number=2;

  showMe(){
    console.log('Buradayim');
  }

  addClass(id: number) {
    this.wId = id;
  }

  getActiveNo():number{
    return this.wId;
  }
}
