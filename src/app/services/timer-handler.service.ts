import { Injectable } from "@angular/core";
import { COMMON_VARS } from "../../env/comman-vars";
import { BehaviorSubject, interval, map, Observable, Subject, Subscription, switchMap, take, timeInterval } from "rxjs";


@Injectable({providedIn: 'root'})
export class TimerHandlerService{

    private subscription!: Subscription;

    public timerSubject: Subject<number>= new Subject<number>()
    private timerStartValue: BehaviorSubject<number>=new BehaviorSubject<number>(COMMON_VARS.TIMER_VALUE);
    public timerStartValue$: Observable<number>=this.timerStartValue.asObservable();
    
    public timerStart(): void{
        let countdown: number = COMMON_VARS.TIMER_VALUE ;

        if(this.subscription){
            this.subscription.unsubscribe();
        }

        this.subscription = this.timerStartValue$.pipe(
            switchMap((countdown: number) => {
                return interval(1000).pipe(
                    take(countdown + 1),
                    map((value: number) => {
                        console.log(value, countdown - value);
                        return countdown - value;
                    })
                );
            })
        ).subscribe((countdown: number) => {
            this.timerSubject.next(countdown);
        });
    }

    public changeTimerStartValue(timer: number): void{
        this.timerStartValue.next(timer);
    }

    public allUnsubscribe(): void{
        this.subscription.unsubscribe();
        this.timerSubject.complete();
    }
}