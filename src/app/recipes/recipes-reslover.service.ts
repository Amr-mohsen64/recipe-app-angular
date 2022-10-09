import { RecipeService } from "./recipe.service";
import { DataStorageService } from "./../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class RecipesResloverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private RecipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //if we had recipes dont get recipes again from server
    const recipes = this.RecipeService.getRecipes();
    if (recipes.length === 0) {
      //we not subscribe here becuase reslolver will subscribe for us once data is there
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
