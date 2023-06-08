import { Component , OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupRequestPayload} from "./sign-up-request.payload";
import {AuthService} from "../service-pool/auth.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as SYSTEMCONSTANT from "../../system_constants/system-constants";
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'signUp',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm:FormGroup;
  signupRequestPayload: SignupRequestPayload;

  vErrorStatus:string ="I"; //  Initial--> I , Error --> E , Success--> S
  wErrorAck:string='';
  wErrorDBAck:string='';
  bShowNotification:boolean=false;
  wStrOut : string="alert ";
  timeAt :number=0;
  constructor(private authService: AuthService,
              private router:Router,
              private toastr: ToastrService){

    this.signupRequestPayload  ={
      email: '',
      username: '',
      password: ''
    };

    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signUp(){
     // @ts-ignore
    this.signupRequestPayload.email = this.signUpForm.get('email').value;
    // @ts-ignore
    this.signupRequestPayload.username = this.signUpForm.get('username').value;
    // @ts-ignore
    this.signupRequestPayload.password = this.signUpForm.get('password').value;

    console.log(this.signUpForm.get('email')?.value);
    console.log(this.signUpForm.get('username')?.value);
    console.log(this.signUpForm.get('password')?.value);
    this.vErrorStatus ="I";
    this.bShowNotification=false;

  // yanlıs bir yaklasim, hata varsa mesaj dondurme ,hata yoksa mesaj yaz
    this.wErrorAck = this.commit_control();
    if(this.wErrorAck === ''){ //hata var
      this.vErrorStatus ="E";
      this.bShowNotification=true;
      console.log(this.getMessageAck());
      return;
    }else if(this.wErrorAck === 'NO ERROR'){
      this.vErrorStatus ="S";
      this.bShowNotification=true;
      console.log(this.getMessageAck());
    }


      this.authService.signUp(this.signupRequestPayload)
      .subscribe(data => {

          this.router.navigate(['/logIn'],
            { queryParams: { registered: 'true' } });

          console.log(data);


      } , (err) => {

        this.vErrorStatus ="D";
        this.bShowNotification=true;
        this.wErrorDBAck= 'Connection Error' ;//err.error.message;
        console.log('Hata mesajı' + this.wErrorDBAck);
        //this.toastr.error('Registration Failed! Please try again');

          console.log('error status 417 :'+ err.message);

      });

  }
   commit_control():string{

    if(this.signUpForm.get('email')?.value.length === 0){
      return '';
    }
    if(this.signUpForm.get('username')?.value.length === 0){
      return '';
    }
    if(this.signUpForm.get('password')?.value.length === 0){
      return '';
    }
     if(!this.signUpForm.get('email')?.dirty || !this.signUpForm.get('username')?.dirty || !this.signUpForm.get('password')?.dirty ){
       return '';
     }

    if(!this.signUpForm.get('email')?.valid && this.signUpForm.get('email')?.touched && this.signUpForm.get('email')?.toString()!= ""){
      return '';
     }
     if(!this.signUpForm.get('username')?.valid && this.signUpForm.get('username')?.touched){
       return '';
     }
     if(!this.signUpForm.get('password')?.valid && this.signUpForm.get('password')?.touched){
       return '';
     }

     return 'NO ERROR';
   }


  getMessageClass():string{

    let strOut="";
    if( this.vErrorStatus ==="I" && this.bShowNotification===false){

      strOut = strOut + "disappear ";
      return strOut;

    }else{

      strOut = strOut + "right-corner ";

      if(this.bShowNotification===true){
        if( this.vErrorStatus ==="D" ){
          strOut = strOut + "showItem alert-danger ";
        }
        else if( this.vErrorStatus ==="E" ){
           if(this.getMessageAck() ===SYSTEMCONSTANT.UNKNOWN_MESSAGE){
             strOut = strOut + "disappear ";
           }else{
             strOut = strOut + "showItem alert-danger ";
           }

        }else{
          strOut = strOut + "showItem alert-success ";
        }
      }else{
        strOut = strOut + "disappear ";
      }

    }

    return strOut;
  }
  getTransitionClass():string{

    if(this.vErrorStatus === "D" || this.vErrorStatus === "E" || this.vErrorStatus ==='S'){
      clearTimeout(this.timeAt);
      this.timeAt=setTimeout(()=>{
        this.bShowNotification=false;
        return "disappear";
      }, 4000);
    }
    return "disappear";




  }
  getMessageAck():string{
    if(this.vErrorStatus  ==="E"){
      if(!this.signUpForm.get('email')?.valid && this.signUpForm.get('email')?.touched){

        return SYSTEMCONSTANT.NOTIFICATION_IMAGE[1].message;//SYSTEMCONSTANT.REQUIRED_MESSAGE;
      }
      if(!this.signUpForm.get('username')?.valid && this.signUpForm.get('username')?.touched){
        return SYSTEMCONSTANT.NOTIFICATION_IMAGE[1].message;//SYSTEMCONSTANT.REQUIRED_MESSAGE;
      }
      if(!this.signUpForm.get('password')?.valid && this.signUpForm.get('password')?.touched){
        return SYSTEMCONSTANT.NOTIFICATION_IMAGE[1].message;//SYSTEMCONSTANT.REQUIRED_MESSAGE;
      }
      if(!this.signUpForm.get('email')?.dirty || !this.signUpForm.get('username')?.dirty || !this.signUpForm.get('password')?.dirty ){
        return SYSTEMCONSTANT.NOTIFICATION_IMAGE[1].message;//SYSTEMCONSTANT.REQUIRED_MESSAGE;
      }
      return SYSTEMCONSTANT.UNKNOWN_MESSAGE;
    }else if(this.vErrorStatus  ==="S"){
      return SYSTEMCONSTANT.NOTIFICATION_IMAGE[0].message;//SYSTEMCONSTANT.SUCCESS_MESSAGE;
    }
    else if(this.vErrorStatus  ==="D"){
      return this.wErrorDBAck;
    }

    return SYSTEMCONSTANT.UNKNOWN_MESSAGE;
  }

  getIcon():string{
      if(SYSTEMCONSTANT.NOTIFICATION_IMAGE[1].message ===this.getMessageAck()){
        return   SYSTEMCONSTANT.NOTIFICATION_IMAGE[1].icon;
      } else if(SYSTEMCONSTANT.NOTIFICATION_IMAGE[0].message===this.getMessageAck()){
        return SYSTEMCONSTANT.NOTIFICATION_IMAGE[0].icon;
    }
      return SYSTEMCONSTANT.NOTIFICATION_IMAGE[2].icon;
  }
  getIconClass():string{

      let strOut="";
      if( this.vErrorStatus ==="I" && this.bShowNotification===false){

        strOut = strOut + "disappear ";
        return strOut;

      }else{

        strOut = strOut + "right-icon ";

        if(this.bShowNotification===true){
          if( this.vErrorStatus ==="E" ){
            strOut = strOut + "showItem alert-danger ";
          }else{
            strOut = strOut + "showItem alert-success ";
          }
        }else{
          strOut = strOut + "disappear ";
        }

      }

      return strOut;

  }
}
