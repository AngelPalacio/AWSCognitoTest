import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  login() {
    Auth.signIn('mike', 'passmike')
      .then((user) => {
        console.log('Login correcto!');
        console.log(user);
        Auth.currentAuthenticatedUser().then((u) => {
          console.log('El usuario está autenticado');
          console.log(u);
        });
      })
      .catch((err) => console.error(err));
  }

  logout() {
    Auth.signOut().then((data) => {
      console.log('Logout correcto');
      console.log(data);
    });
  }

  changeUser() {
    Auth.currentAuthenticatedUser().then((user) => {
      console.log('Actualizando datos...');
      Auth.updateUserAttributes(user, { preferred_username: 'mikey' }).then(
        (data) => {
          console.log('datos actualizados');
          console.log(data);
        }
      );
    });
  }
}
