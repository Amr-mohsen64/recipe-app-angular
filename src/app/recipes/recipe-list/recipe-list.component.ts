import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("recipe name", "recipe desc ", "https://www.bbcgoodfoodme.com/wp-content/uploads/2022/05/sticky-ginger-honey-chicken-skewers-with-noodle-salad.png"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
