import { Injectable } from "@angular/core";
import { COMMON_VARS } from "../../env/comman-vars";
import { BehaviorSubject, interval, map, Observable, of, Subject, Subscription, switchMap, take, timeInterval } from "rxjs";

export type TimerType= 'START' | 'RESUME' 


@Injectable({providedIn: 'root'})
export class TimerHandlerService{

    private subscription!: Subscription;
    private timerPausedValue: number=0;

    public timerSubject: Subject<number>= new Subject<number>()
    private timerStartValue: BehaviorSubject<number>=new BehaviorSubject<number>(COMMON_VARS.TIMER_VALUE);
    public timerStartValue$: Observable<number>=this.timerStartValue.asObservable();
    
    public timerStart(timer$: Observable<number>= this.timerStartValue, isReset: boolean =false): void{
       
        if(this.subscription){
            this.subscription.unsubscribe();
        }

        if(isReset){
            this.timer(this.timerStartValue$)
        }
        else if(this.timerPausedValue!=0){
            this.timerResume();
        }else{
            this.timer(timer$)
        }

    }

    private timer(timerValueObv$: Observable<number>): void{

        if(this.subscription){
            this.subscription.unsubscribe();
        }

        this.subscription= timerValueObv$.pipe(
            switchMap((countdown: number) => {
                return interval(1000).pipe(
                    take(countdown + 1),
                    map((value: number) => {
                        console.log(value, countdown - value);
                        this.timerPausedValue=countdown - value
                        return  this.timerPausedValue;
                    })
                );
            })
        ).subscribe((countdown: number) => {
            this.timerSubject.next(countdown);
        });
    }

    public timerResume(): void{
        this.timer(of(this.timerPausedValue));
    }

    public changeTimerStartValue(timer: number): void{
        this.timerStartValue.next(timer);
        this.timerPausedValue=0;
        if(this.subscription){
            this.subscription.unsubscribe();
        }
            
    }

    public allUnsubscribe(): void{
        this.subscription.unsubscribe();
    }
}