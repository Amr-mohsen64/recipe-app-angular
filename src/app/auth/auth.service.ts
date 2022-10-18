import { Router } from "@angular/router";
import { User } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface AuthResponeData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponeData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQlDdfRRBpxGCiTB23x_DFk7sCs1h5ag0",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        // it's good to handle errors here in the service and get it from component throuh
        // catchError which catches erro and throwError to throw error to subcribers
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponeData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQlDdfRRBpxGCiTB23x_DFk7sCs1h5ag0",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    // now + expiretion * 1000 to convert it milliseconds
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknowen error occured!";
    console.log(errorRes);

    if (!errorRes.error || !errorRes.error.error) {
      throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case "EMAIL_EXISTS":
          errorMessage = "this Email Already exists";
          break;

        case "INVALID_PASSWORD":
          errorMessage = "the password you enterd is invalid";
          break;

        case "EMAIL_NOT_FOUND":
          errorMessage = "the email you have entered it invaild";
          break;
      }
      return throwError(errorMessage);
    }
  }
}
