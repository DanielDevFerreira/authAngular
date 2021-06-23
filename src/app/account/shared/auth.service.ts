import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ){}

  async login(user: any){
   
    //consumindo uma api no angular
    // this.http.post<any>(`${environment.api}/auth/signin`, user).subscribe();
    
    const result = await this.http.post<any>(`${environment.api}/auth/signin`, user).toPromise();
    try {
      if(result && result.token.acessToken){
        window.localStorage.setItem('token', result.token.acessToken);
        console.log(result.message);
        return result.message;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
  }
 

  async createAccount(account: any){
    const result = await this.http.post<any>(`${environment.api}/auth/signup`, account).toPromise();
    return result;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  // pegando a data de encerramento do token
  getTokenExpirationDate(token: string): Date{
    const decoded: any = jwt_decode(token);

    if(decoded.exp === undefined){
      return null as any;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  //verificando se o token estar expirado
  isTokenExpired(token?: string): boolean{
    if(!token){
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if(date === undefined){
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  //verificando se o usuário estar logado
  isUserLoggedIn(){
    const token = this.getAuthorizationToken();
    if(!token){
      return false;
    }else if(this.isTokenExpired(token)) {
      return false
    }

    return true;
  }

}
