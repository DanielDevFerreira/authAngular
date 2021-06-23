import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private accountService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  async onSubmit(){
    try {
      const result = await this.accountService.createAccount(this.account);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

}
