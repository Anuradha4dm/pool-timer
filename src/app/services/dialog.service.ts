import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class DialogService{

    private isDialogOpen:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
    public isDialogOpen$: Observable<boolean>=this.isDialogOpen.asObservable()


    public toggleDialogBox(){
        this.isDialogOpen.next(!this.isDialogOpen.value);
    }

}