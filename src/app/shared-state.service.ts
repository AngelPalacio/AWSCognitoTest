import { Injectable } from '@angular/core';
import { IUser } from './user-model/user';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  public LoggedUser: IUser = null;
  public UserIsLogged = false;

  constructor() {}

  setLoggedUser(user: any) {
    if (user) {
      this.UserIsLogged = true;
      this.LoggedUser = {
        name: user.username,
        nickname: user.attributes.preferred_username,
        email: user.attributes.email,
        phone1: user.attributes.phone_number,
        phone2: user.attributes['custom:phone2'],
        benutzerErstellt: user.attributes['custom:BenutzerErstellt'],
      };
    }
  }
}
