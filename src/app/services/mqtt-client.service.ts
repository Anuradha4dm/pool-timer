import { Injectable } from "@angular/core";
import { Client, Message } from 'paho-mqtt';
import * as CryptoPack from 'crypto-js';
import { TimerHandlerService } from "./timer-handler.service";

@Injectable({ providedIn: 'root' })
export class MqttClientService {
  private client: Client;
  private readonly clientId:string= `IFS-POOLDAY${this.generateSalt(10)}`

  public isConnectionLive: boolean=false;

  constructor(
    private timerHandlerService: TimerHandlerService
  ) {
    this.client = new Client('broker.hivemq.com', 8884, '/mqtt', this.clientId);
  }

  public connect(topicClient: string): void {
    this.client.connect({
      useSSL: true,
      onSuccess: () => {
        console.log('connection was success');
        this.isConnectionLive=true;
        let topic: string =this.hashContent('IFSSportsDay2024ClashOfWizards')
        //TODO: remove this line after router is introduced.
        console.log(topic);
        this.client.subscribe(`${topic+'/'+topicClient}`)
      },
      onFailure: (error) => {
        this.isConnectionLive=false;
        console.log('Mqtt error occured.', error)
      }
    });

    this.client.onMessageArrived = (message: Message) => {
      console.log('MQTT message received:', message.payloadString);
      if(message.payloadString==='start'){
        this.timerHandlerService.timerStart();
      }

      if(message.payloadString==='stop'){
        this.timerHandlerService.allUnsubscribe();
      }
    };

    this.client.onConnectionLost = (responseObject: { errorCode: number, errorMessage: string }) => {
      if (responseObject.errorCode !== 0) {
        console.error('MQTT connection lost:', responseObject.errorMessage);
      }
    };
  }

  public publish(topic: string, message: string): void {
    const mqttMessage = new Message(message);
    mqttMessage.destinationName = topic;
    this.client.send(mqttMessage);
  }

  public disconnect(): void {
    this.isConnectionLive=false;
    this.client.disconnect();
  }

  private generateSalt(length:number =8): string{
    return CryptoPack.lib.WordArray.random(length).toString();
  }

  private hashContent(content:string): string{
    return CryptoPack.MD5(content).toString();
  }
}