import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: '', 
  };

  message: string = '';

  items = [];

  constructor(
    private accountService: AuthService,
    private router: Router,
    private http: HttpClient,
  ){
    this.http.get(`${environment.api}/tasks`).toPromise().then((data) =>{
      return JSON.stringify(data);


      
    });    
  }

  ngOnInit(): void {
    
  }

  async onSubmit(){
    
      const result = await this.accountService.login(this.login);
        this.message = result;
        this.router.navigate(['']);
   
  }

}
