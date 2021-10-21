import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService{
ingredientsChanged = new Subject<Ingredient[]>();

startedEditing = new Subject<number>();


private ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
];
public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
}

addIngredient(ingredient: Ingredient):void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
}
addIngredients(ingredients: Ingredient[]):void {

    // for (let ingredient of ingredients) {
    //     this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
}

getIngredient(index: number): Ingredient {
 return this.ingredients[index];
}
updateIngredient(index: number, newIngredient: Ingredient):void {
    this.ingredients[index]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
}
deleteIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
}



        

    
    

}