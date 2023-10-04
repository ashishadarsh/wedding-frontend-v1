import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public email: any;
  public name: string;
  public time: string = '';
  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  private countdownInterval: any; 
  public now = new Date().getTime();
  public deadline: any;
  isHomeRoute: boolean = false;
  
  constructor(private authService: AuthService,  private router: Router) {
    console.log("ooooooooo");
    
    this.authService.user.subscribe(data => {
      if(data) {
        console.log({data});
        
        this.email = data.email;
        this.name = data.firstName + " " + data.lastName
        this.deadline = new Date(data.marriageDate).getTime(); // Deadline in milliseconds
        this.now = new Date().getTime();
        this.updateCountdown(); // Call the initial countdown update

        // Update the countdown timer every second
        this.countdownInterval= setInterval(() => {
          this.now = new Date().getTime(); // Current time in milliseconds
          this.updateCountdown();
        }, 1000);
      } else {
        this.email = "";
        this.name = "";
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.deadline = 0;
        this.now = 0;
        clearInterval(this.countdownInterval);
        this.updateCountdown();
      }
      
    });
  }

  ngOnInit() {
     this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = this.router.url === '/';
        console.log("jjjjjjjjj");
        
     }
    });
  }

  private updateCountdown() {
    const deadline = this.deadline;
    const now = this.now;
    const t = deadline - now;
    this.days = Math.floor(t / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((t % (1000 * 60)) / 1000);
  }
}
