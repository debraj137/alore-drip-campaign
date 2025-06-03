import { Injectable, OnInit } from '@angular/core';
import Pusher from 'pusher-js/types/src/core/pusher';


@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any = ""
  constructor(
   
  ) { 
    this.pusher = new Pusher("6923d798e727ea103799", {
      cluster: "ap2",
    })
  }

  OnInit(): void {
    this.listenChannel();
  }

  listenChannel(){

    this.pusher.connection.bind("connnected", this.connectedExecute())

    this.pusher.allChannels().forEach((channel: any) => {
   
    });
  }

  connectedExecute(){

  }
}
