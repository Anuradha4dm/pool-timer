import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pool-timer';

  public timer:number = 0;
  private intervalId: any;

  startTimer(){
    this.timer = 0;

    if(this.intervalId){
      clearInterval(this.intervalId);
    }

    this.intervalId=setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer(){
    clearInterval(this.intervalId);
  }
}
