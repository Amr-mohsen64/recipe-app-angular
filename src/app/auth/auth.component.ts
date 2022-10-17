import { AuthResponeData, AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }

    let authObservable: Observable<AuthResponeData>;
    const email: string = authForm.value.email;
    const password: string = authForm.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.signIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    // here becuase the same code is in signup , login observables and we subscribe im one of them
    authObservable.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
      },
      (errorMsg) => {
        this.error = errorMsg;
        this.isLoading = false;
      }
    );

    console.log(authForm.value);

    authForm.reset();
  }
}
