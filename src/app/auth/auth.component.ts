import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error:string =  null;

  constructor(private authService: AuthService, private router: Router) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log("form",form.value);
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs = this.authService.Login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (resData: AuthResponseData) => {
        console.log({ resData });
        this.isLoading = false;
        this.router.navigate(['/budgets']);
      },
      error: (error) => {
        this.error = "An error occurred!";
        this.isLoading = false;
      }
    });
    
    form.reset();
  }
}
