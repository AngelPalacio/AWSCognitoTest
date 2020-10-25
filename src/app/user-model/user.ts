export interface IUser {
  name: string;
  nickname: string;
  email: string;
  phone1: string;
  phone2: string;
  benutzerErstellt: string;
}

export class User implements IUser {
  name: string;
  nickname: string;
  email: string;
  phone1: string;
  phone2: string;
  benutzerErstellt: string;
}
