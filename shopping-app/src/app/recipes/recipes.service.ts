import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Beef Wellington',
      'Follow Gordan Ramsay version',
      'https://i0.wp.com/goepicurista.com/wp-content/uploads/2017/11/IMG_2357-e1510956466573.png',
      [
        new Ingredient('Beef tenderloin', 700),
        new Ingredient('Puff pastry', 300),
        new Ingredient('Mushrooms', 350),
      ]),
    new Recipe(
      'Caramel Pudding',
      'Follow Hakon Marthinsen version',
      'https://i.ytimg.com/vi/TgIBspDLMnQ/maxresdefault.jpg',
      [
        new Ingredient('Sugar', 200),
        new Ingredient('Milk', 600),
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes = () => {
    return this.recipes.slice();
  }

  addToIngredientShoppingList = (ingredients: Ingredient[]) => {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe = (id: number) => {
    return this.recipes[id];
  }
}
