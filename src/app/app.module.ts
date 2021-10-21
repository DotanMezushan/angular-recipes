import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipe.service';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list-module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    RecipesRoutingModule,
    ShoppingListModule,
    SharedModule
    
    
  ],
  providers: [ShoppingListService, RecipeService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService , multi: true}],


  bootstrap: [AppComponent]
  
})
export class AppModule { }