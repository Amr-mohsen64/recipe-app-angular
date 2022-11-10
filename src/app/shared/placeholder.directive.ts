import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appPlaceholder]",
})
export class PlaceholderDirective {
  // gives u an acces to the place where this directive is placed
  constructor(public viewContainerRef: ViewContainerRef) {}
}
