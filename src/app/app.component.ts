import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import { SharedStateService } from './shared-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ABSTestApp';

  constructor(
    public sharedStateService: SharedStateService,
    private router: Router
  ) {
    Auth.currentAuthenticatedUser()
      .then((authUser) => {
        console.log('User is logged in');
        console.log(authUser);
        this.sharedStateService.setLoggedUser(authUser);
        this.router.navigateByUrl('user-details');
      })
      .catch((err) => {
        console.log(err);
        this.router.navigateByUrl('/');
      });
  }

  logout() {
    Auth.signOut().then((data) => {
      this.sharedStateService.UserIsLogged = false;
      this.sharedStateService.LoggedUser = null;
      console.log('logged out');
      this.router.navigateByUrl('/');
    });
  }
}
