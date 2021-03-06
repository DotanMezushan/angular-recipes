import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f',{static: false}) slForm!: NgForm;
  subscription!: Subscription;
  editMode : boolean = false;
  editedItemIndex!: number ;
  editedItem!:Ingredient;


  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppingListService:ShoppingListService) { }
 

  ngOnInit(): void {
    this.subscription =this.shoppingListService.startedEditing
    .subscribe((index: number) =>{
      this.editMode=true;
      this.editedItemIndex =index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }
 
  onSubmit(form :NgForm):void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name , value.amount ) 
    if(this.editMode){
      this.shoppingListService.updateIngredient( this.editedItemIndex,newIngredient);  
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onClear(){
    this.slForm.reset();
    this.editMode= false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  

}
