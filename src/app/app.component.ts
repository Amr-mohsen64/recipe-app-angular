import { Component } from "@angular/core";
import { Recipe } from "./recipes/recipe.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  loadedFeature: string = "recipe";
  selectedRecipe: Recipe;
  onSelectFeature(feature: string) {
    this.loadedFeature = feature;
    console.log(this.loadedFeature);
  }
}
