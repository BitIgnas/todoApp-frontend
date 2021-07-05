import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserSharingServiceService {

  constructor() { }

  private user = new BehaviorSubject<any>(Object);

  public setUser(user: User): void {
    this.user.next(user);
  }

  public getUser(): Observable<User> {
    return this.user;
  }

  public clearUser(): void {
    this.user.next(Object);
  } 


}
