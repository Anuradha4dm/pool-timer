import { Component } from "@angular/core";
import { DialogService } from "../services/dialog.service";
import { COMMON_VARS } from "../../env/comman-vars";
import { MqttClientService } from "../services/mqtt-client.service";
import { TimerHandlerService } from "../services/timer-handler.service";


@Component({
    selector:'dialog-box',
    templateUrl:'./dialog-box.component.html',
    styleUrl:'./dialog-box.component.scss'
})
export class DialogBoxComponent {
    public topic: string=COMMON_VARS.TOPIC;
    public timerValue: number=COMMON_VARS.TIMER_VALUE;

    constructor(
        private dialogService: DialogService,
        private mqttClientService: MqttClientService,
        private timerHandlerService: TimerHandlerService
    ){}

    public closeDialog(): void{
        this.dialogService.toggleDialogBox();
    }

    public apply(): void{
        COMMON_VARS.TIMER_VALUE=this.timerValue;
        COMMON_VARS.TOPIC=this.topic;

        this.timerHandlerService.changeTimerStartValue(COMMON_VARS.TIMER_VALUE);
        this.dialogService.toggleDialogBox();

        if(this.mqttClientService.isConnectionLive){
            this.mqttClientService.disconnect();
        }

        this.mqttClientService.connect(COMMON_VARS.TOPIC)
    }
}