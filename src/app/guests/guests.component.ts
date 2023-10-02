import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent {
  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      console.log('User in component:', user);
      // Handle user data here
    });
  }

  
}
