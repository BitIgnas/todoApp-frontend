import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

constructor() { }

refresh = new BehaviorSubject<boolean>(true);

setRefresh(refresh: boolean) {
  this.refresh.next(refresh);
  }

  loadingOn() {
    return this.refresh.next(true);
  }

  loadingOff() {
    return this.refresh.next(false);
  }

}
