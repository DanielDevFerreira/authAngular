import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/account/shared/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}


  ngOnInit(): void {
  }

  async removeToken() {
    await this.authService.onLogout();
  }

  // async loadTask(){
  //   const tasks = await this.http.get<any>(`${environment.api}/tasks`).subscribe();
  //   console.log(tasks);
  // }

  // async loadTask(){
  //   this.http.get(`${environment.api}/tasks`).toPromise().then((data) =>{
  //     console.log(data);
  //   });
  // }
}
