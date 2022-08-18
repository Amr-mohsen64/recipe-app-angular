import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Ingredient } from "./../shared/ingredients.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "Big Fat burger",
      " A super tastey big fat Big Fat burger",
      "https://www.bbcgoodfoodme.com/wp-content/uploads/2022/05/sticky-ginger-honey-chicken-skewers-with-noodle-salad.png",
      [new Ingredient("meat", 1), new Ingredient("frech fries", 3)]
    ),
    new Recipe(
      "KFC",
      "A spicy KFC",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      [new Ingredient("bread", 2), new Ingredient("meat", 3)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }
}
