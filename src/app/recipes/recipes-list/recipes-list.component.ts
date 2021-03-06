import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes :Recipe[]=[];
  subscription !: Subscription;
  constructor(private recipeService : RecipeService, private router : Router,
    private route : ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscription
    .unsubscribe();
  }

  ngOnInit(): void {
    this.subscription =this.recipeService.recipesChange
    .subscribe((recipes:Recipe[]) =>{
      this.recipes = recipes;
    });
   this.recipes =this.recipeService.getRecipes();
  }
  onNewRecipe(){
    this.router.navigate(['new'] ,{relativeTo: this.route})
  }


}


