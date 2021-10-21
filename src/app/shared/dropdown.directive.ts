import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective  {
    //that for biddings
    @HostBinding('class.open') isOpen:boolean = false;
    //that for content to event
    @HostListener ('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }

}