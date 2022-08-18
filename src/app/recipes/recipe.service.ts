import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "recipe nameasdddddddddd",
      "recipe descasddddddddddddddddddddddddddddd ",
      "https://www.bbcgoodfoodme.com/wp-content/uploads/2022/05/sticky-ginger-honey-chicken-skewers-with-noodle-salad.png"
    ),
    new Recipe(
      "recipe name",
      "recipe desc asddddddsfdfg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    ),
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
