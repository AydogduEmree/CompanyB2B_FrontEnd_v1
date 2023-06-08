import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestPayload} from "../sign-up/sign-up-request.payload";
import {Observable, throwError} from "rxjs";
import {LoginRequestPayload} from "../login/login-request.payload";
import { LoginResponse } from '../login/login-response.payload';
import { RefreshToken } from '../login/refresh-token';
import {LocalStorageService} from "ngx-webstorage";
import { map, tap } from 'rxjs/operators';
import {ServiceExecutionResult} from "../../service_result/ServiceExecutionResult";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpURL = "http://localhost:8080/api/auth/signup";
  private logInURL:string ="http://localhost:8080/api/auth/login" ;
  private logOutURL:string ="http://localhost:8080/api/auth/logout" ;

  refreshTokenPayload: RefreshToken= {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  constructor(private httpClient: HttpClient,
              private localStorage:LocalStorageService) {

  }

  signUp(signupRequestPayload: SignupRequestPayload) : Observable<any> {
    return this.httpClient
                .post<ServiceExecutionResult>(this.signUpURL, signupRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('data', data);
        this.localStorage.store('errorMessage', data.message);
        this.localStorage.store('errorCode', data.errorCode);
        this.localStorage.store('successCode', data.successCode);

      }));

  }

  logIn(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.logInURL,
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

     // this.loggedIn.emit(true);
      //this.username.emit(data.username);
      return true;
    }));
  }

  logOut(){
    return this.httpClient.post(this.logOutURL, this.refreshTokenPayload,
      { responseType: 'text' }).subscribe(data=>{
          console.log(data);
    },err=>{
      throwError(err);
    });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
}
