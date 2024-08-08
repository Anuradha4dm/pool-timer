import { Injectable } from "@angular/core";
import { COMMON_VARS } from "../../env/comman-vars";
import { interval, map, Observable, Subject, Subscription, take, timeInterval } from "rxjs";


@Injectable({providedIn: 'root'})
export class TimerHandlerService{

    private subscription!: Subscription;

    public timerSubject: Subject<number>= new Subject<number>()
    
    public timerStart(): void{
        let countdown: number = COMMON_VARS.TIMER_VALUE ;

        if(this.subscription){
            this.subscription.unsubscribe();
        }

       this.subscription=interval(1000).pipe(
        take(countdown+1),
        map((value: number)=>{
            console.log(value, countdown-value)
            return countdown-value;
        })
       ).subscribe((countdown:number)=>{
        this.timerSubject.next(countdown);
       })
    }

    public allUnsubscribe(): void{
        this.subscription.unsubscribe();
        this.timerSubject.complete();
    }
}