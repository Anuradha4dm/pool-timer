import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COMMON_VARS } from '../env/comman-vars';
import { MqttClientService } from './services/mqtt-client.service';
import { TimerHandlerService } from './services/timer-handler.service';
import { Observable, Subscription } from 'rxjs';
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'pool-timer';

  public timer:number = COMMON_VARS.TIMER_VALUE;
  private subscription!: Subscription;

  public isDialogOpen:boolean=false;

  constructor(
    private mqttClientService: MqttClientService,
    private timerHanlderService: TimerHandlerService,
    private dialogService: DialogService
  ) { }

  public ngOnInit(): void {

    if(this.subscription){
      this. subscription.unsubscribe();
    }

   this.subscription=this.timerHanlderService.timerSubject.subscribe((countdown: number)=>{
    this.timer=countdown;
   });

   this.timerHanlderService.timerStartValue$.subscribe((timerValue)=>{
    this.timer=timerValue;
  });
  }

  public ngOnDestroy(): void {
    this.mqttClientService.disconnect();
    this.subscription.unsubscribe();
  }

  public triggerWebSocketMessage():void{
    this.mqttClientService.publish('ifs-sports-day', 'my test data');
  }


  startTimer(){  

  }

  stopTimer(){
    this.subscription.unsubscribe();
    this.timerHanlderService.allUnsubscribe();
  }

  public toggleDialogBox(): void{
    this.dialogService.toggleDialogBox()
  }

  public getDialogOpenState(): Observable<boolean>{
    return this.dialogService.isDialogOpen$;
  }

}
