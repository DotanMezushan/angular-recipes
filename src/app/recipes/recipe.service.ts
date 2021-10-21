import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe-model";

@Injectable()

export class RecipeService{

  recipesChange = new Subject<Recipe[]>();

  //  private recipes :Recipe[]=[
  //       new Recipe('recipe1',
  //       'description1',
  //       'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/bean-recipes-1-580x740.jpg',
  //         [new Ingredient('water',1),
  //         new Ingredient('frize',1)
  //       ]
  //       ),
  //       new Recipe('recipe2',
  //       'description2',
  //       'https://heninthekitchen.com/wp-content/uploads/2021/04/IMG_1849-1small-683x1024.jpg',
  //       [new Ingredient('water',1),
  //       new Ingredient('frize',1)]
  //       )
  //     ];
     private recipes :Recipe[]=[];

      constructor(private shoppingListService:ShoppingListService){}

    public getRecipes():Recipe[] {
        // we return slice for the original will not be effected 
        return this.recipes.slice();
    }
    public addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
    public getRecipe(index: number):Recipe{
      return this.recipes[index];
    }
    public addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChange.next(this.recipes.slice());
    }
    public updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index]=newRecipe;
      this.recipesChange.next(this.recipes.slice());
    }
    public deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChange.next(this.recipes.slice());

    }
    public setRecipes(recipes: Recipe[]){
      this.recipes =recipes;
      this.recipesChange.next(this.recipes.slice());
    }

}