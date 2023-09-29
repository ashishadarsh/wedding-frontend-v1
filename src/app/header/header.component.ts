import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private userSub: Subscription;
  isAuthentcated = false;

  constructor(private authService: AuthService) {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthentcated = !!user;
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
