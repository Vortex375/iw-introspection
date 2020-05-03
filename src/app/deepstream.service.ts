import { Injectable } from '@angular/core';

import { DeepstreamClient } from '@deepstream/client';

@Injectable({
  providedIn: 'root'
})
export class DeepstreamService {

  private readonly ds: DeepstreamClient;

  constructor() {
    // const hostname = window.location.hostname;
    const hostname = 'helios4.local';
    this.ds = new DeepstreamClient(hostname + ':6020');
    this.ds.login();
  }

  getDeepstream(): DeepstreamClient {
    return this.ds;
  }
}
