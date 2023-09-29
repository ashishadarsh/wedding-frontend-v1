import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'wedding-Plannar';


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
     this.authService.autoLogin();
  }

}
