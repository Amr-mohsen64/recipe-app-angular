import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from "@angular/core";

import { Ingredient } from "src/app/shared/ingredients.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shoping-edit",
  templateUrl: "./shoping-edit.component.html",
  styleUrls: ["./shoping-edit.component.css"],
})
export class ShopingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInputRef: ElementRef;
  @ViewChild("amountInput") amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;

    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
