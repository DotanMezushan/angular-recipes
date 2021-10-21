import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder-directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
    constructor(private authService: AuthService
         , private router: Router
         , private componentFactoryResolver: ComponentFactoryResolver
         ){}
    ngOnDestroy(): void {
       if( this.closeSub){
        this.closeSub.unsubscribe();
       }
    }
    isLoginMode = true;
    isLoading  = false;
    error : string = '';
    @ViewChild(PlaceholderDirective ,{ static : false}) alertHost!: PlaceholderDirective;
    private closeSub!: Subscription;
    


    onSwitchMode(){
        this.isLoginMode =!this.isLoginMode;
    }
    onSubmit(form : NgForm){
        if(form.invalid){
            return;
        }
        //console.log(form.value);
        this.isLoading = true;

        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>

        if(this.isLoginMode){
            authObs =this.authService.login(email, password);
        }else{
          
            authObs = this.authService.singUp(email,password);
        }
        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);

        },errorMessage =>{ 
           
            this.error= errorMessage;
            this. showErrorAlert(errorMessage);
            this.isLoading = false;
        }
        );
       
        form.reset();
        this.error='';
    }

    onHandleError(){
        this.error='';
    }

    private showErrorAlert(errorMessage : string){
       const alertCmoFactory = this.componentFactoryResolver
       .resolveComponentFactory(AlertComponent);
       const hostViewContainerRef = this.alertHost.viewContainerRef;
       hostViewContainerRef.clear();
       const componentRef = hostViewContainerRef.createComponent(alertCmoFactory);
       componentRef.instance.message = errorMessage;
       this.closeSub =componentRef.instance.close.subscribe( () =>{
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
       })

    }

}