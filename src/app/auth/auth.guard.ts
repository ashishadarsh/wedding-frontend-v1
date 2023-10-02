import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { catchError, tap, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("guard",this.authService.user);
    return this.authService.user.pipe(
      take(1),
      tap(user => {
        console.log("User received:", user);
      }),
      switchMap(user => {
        if (user) {
          // User is authenticated, allow access to the route
          return of(true);
        } else {
          // User is not authenticated, redirect to the login page
          return of(this.router.createUrlTree(['/auth']));
        }
      }),
      catchError(error => {
        console.error("Error in canActivate:", error);
        // Handle errors if any
        return of(false); // or handle the error and return an appropriate value
      })
    );
  }
}
