import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShopingEditComponent } from "./shoping-edit/shoping-edit.component";
import { ShoppingListRoutingModule } from "./shoping-list.routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations: [ShoppingListComponent, ShopingEditComponent],
  imports: [FormsModule, ShoppingListRoutingModule, SharedModule],
})
export class ShoppingListModule {}
