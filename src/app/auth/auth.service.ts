import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import {updateAuthToken} from '../graphql/queries.js'

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    _id: string;
    registered?: boolean;
    firstName: string;
    lastName: string;
    marriageDate: Date
}

@Injectable({
    providedIn:"root"
})
export class AuthService {
    user = new Subject<User>();
    private tokenExpirationTimer: any;

    API_URL = 'http://localhost:9000'
    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string, firstName: string, lastName: string, marriageDate: Date) {
        return this.http.post<AuthResponseData>(`${this.API_URL}/signup`,
        {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            marriageDate: marriageDate,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData => {
            console.log({resData});
            
            this.handleAuthentication(resData.email, resData._id, resData.idToken, 3600, resData.firstName, resData.lastName, resData.marriageDate);
        }));
    }

    Login(email: string, password: string) {
        const token = localStorage.getItem('authToken');
            return this.http.post<AuthResponseData>(
                `${this.API_URL}/login`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                },
            ).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData._id, resData.idToken, 3600,  resData.firstName, resData.lastName, resData.marriageDate);
                })
            );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
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
      console.log({userData});
      
        const loadedUser = new User(userData.email, userData.id, token, new Date(tokenExpirationTimestamp),userData.firstName, userData.lastName, userData.marriageDate);
      
        if (loadedUser.token && tokenExpirationTimestamp > currentTimestamp) {
          this.user.next(loadedUser);
          const expirationDuration = tokenExpirationTimestamp - new Date().getTime();
          this.autoLogout(expirationDuration);
        }
      }
      
      autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
      }
    

    private handleError(errorRes: HttpErrorResponse ) {
        return throwError(errorRes);
        
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, firstName:string, lastName: string, marriageDate?: Date) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        console.log("herererererre",marriageDate);
        
        // Store the token and expiration date securely
        try {
            localStorage.setItem('authToken', token);
            localStorage.setItem('authTokenExpiration', expirationDate.getTime().toString());
        } catch (e) {
            console.error('Error storing data in localStorage:', e);
        }
    
        const user = new User(email, userId, token, expirationDate,firstName, lastName, marriageDate);
                console.log({user});
                
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userData', JSON.stringify(user));
        updateAuthToken(token);
    }
    
    
}