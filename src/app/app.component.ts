import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COMMON_VARS } from '../env/comman-vars';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pool-timer';

  public timer:number = COMMON_VARS.TIMER_VALUE;
  private intervalId: any;


  constructor() {
  }

  startTimer(){
    this.timer = COMMON_VARS.TIMER_VALUE;

    if(this.intervalId){
      clearInterval(this.intervalId);
    }

    this.intervalId=setInterval(() => {
      this.timer--;
      if(this.timer==5){

      }

      if(this.timer==0){
        clearInterval(this.intervalId);
      }

    }, 1000);
  }

  stopTimer(){
    clearInterval(this.intervalId);
  }
}
