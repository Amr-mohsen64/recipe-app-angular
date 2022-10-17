import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponeData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
        // catchError which catches erro and throw error tothore error to subcribers
        catchError((errorRes) => {
          let errorMessage = "An unknowen error occured!";
          console.log(errorRes);

          // if i dont have error key in  response
          if (!errorRes.error || !errorRes.error.error) {
            throwError(errorMessage);
          } else {
            switch (errorRes.error.error.message) {
              case "EMAIL_EXISTS":
                errorMessage = "this Email Already exists";
                break;
            }
          }
          return throwError(errorMessage);
        })
      );
  }
}
