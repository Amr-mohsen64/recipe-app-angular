import { PlaceholderDirective } from "./../shared/placeholder.directive";
import { AlertComponent } from "./../shared/alert/alert.component";
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponeData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        authForm.reset();
        this.router.navigate(["/recipes"]);
      },
      (errorMsg) => {
        this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );

    console.log(authForm.value);
  }

  onHandleError() {
    this.error = null;
  }

  showErrorAlert(errorMsg: string) {
    // const alertCmp = new AlertComponent(); -> that's wrong angualr must instaniate not me
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMsg;
    componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
  }
}
