import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    _id: string;
    registered?: boolean;
}

@Injectable({
    providedIn:"root"
})
export class AuthService {
    user = new Subject<User>();
    

    API_URL = 'http://localhost:9000'
    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${this.API_URL}/signup`,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData => {
            this.handleAuthentication(resData.email, resData._id, resData.idToken, 2000);
        }));
    }

    Login(email: string, password: string) {
        const token = localStorage.getItem('authToken');
        // Check if the token is available before sending the request
        if (token) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            });
    
            return this.http.post<AuthResponseData>(
                `${this.API_URL}/login`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                },
                { headers }
            ).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData._id, resData.idToken, 2000);
                })
            );
        } else {
            // Handle the case where the token is not available
            return throwError('Token not available');
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = localStorage.getItem('authToken');
        const authTokenExpiration = parseInt(localStorage.getItem('authTokenExpiration'));
      
        if (!userData) {
          return;
        }
      
        // Convert both dates to UNIX timestamps
        const tokenExpirationTimestamp = new Date(authTokenExpiration).getTime();
        const currentTimestamp = new Date().getTime();
      
        const loadedUser = new User(userData.email, userData.id, token, new Date(tokenExpirationTimestamp));
      
        if (loadedUser.token && tokenExpirationTimestamp > currentTimestamp) {
          this.user.next(loadedUser);
        }
      }
      
    

    private handleError(errorRes: HttpErrorResponse ) {
        return throwError(errorRes);
        
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        // Store the token and expiration date securely
        try {
            localStorage.setItem('authToken', token);
            localStorage.setItem('authTokenExpiration', expirationDate.getTime().toString());
        } catch (e) {
            console.error('Error storing data in localStorage:', e);
        }
    
        const user = new User(email, userId, token, expirationDate);
                
        this.user.next(user);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    
    
}