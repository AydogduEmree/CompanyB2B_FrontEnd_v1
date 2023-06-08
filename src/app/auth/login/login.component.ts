import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login-request.payload";
import {AuthService} from "../service-pool/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import {throwError} from "rxjs";
import { ToastrService } from 'ngx-toastr';
import {UiRelationsService} from "../../shared-services/data-transfer/ui-relations.service";
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;


  isLoggedIn: boolean=false;
  registerSuccessMessage :string='';
  isError: boolean=false;

  wErrorAck:string='';
  wErrorDBAck:string='';
  private opt1 = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              private toastr: ToastrService,
              public UIService : UiRelationsService){


    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {

      this.activatedRoute.queryParams
        .subscribe(params=>{
            if(params['registered'] !==undefined  && params['registered'] === 'true'){
              this.toastr.success('Sign Up Successful!', 'Success');
              this.registerSuccessMessage = 'Please Check your inbox for activation email '
                + 'activate your account before you Login!';
            }
        });
    }

  logIn(){
    // @ts-ignore
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    // @ts-ignore
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    // yanlıs bir yaklasim, hata varsa mesaj dondurme ,hata yoksa mesaj yaz
    this.wErrorAck = this.commit_control();
    if(this.wErrorAck === '') { //hata var
      this.toastr.error('Fulfill Required Fields!');
    }else{
      this.authService.logIn(this.loginRequestPayload).subscribe(data => {
         this.isError = false;
        this.wErrorAck="NO ERROR";
        this.UIService.setlogInNavbarUI("no-ui");
        this.router.navigate(['/home']);
        this.toastr.success('Login Successful');
      }, error => {
        this.isError = true;
        this.wErrorAck='';
        throwError(error);
      });
    }




  }

  commit_control():string{

    if(this.loginForm.get('username')?.value.length  === 0 || this.loginForm.get('password')?.value.length  === 0) {
      return '';
    }
    if(!this.loginForm.get('username')?.dirty || !this.loginForm.get('password')?.dirty ){
      return '';
    }
    if(!this.loginForm.get('username')?.valid && this.loginForm.get('username')?.touched && this.loginForm.get('username')?.toString()!= ""){
      return '';
    }
    if(!this.loginForm.get('password')?.valid && this.loginForm.get('password')?.touched && this.loginForm.get('password')?.toString()!= ""){
      return '';
    }

    return 'NO ERROR';
  }
}
