import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.errorMessage = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.login(this.f.username.value, this.f.password.value, '/user-details');
  }

  login(user, password, redirectUrl) {
    Auth.signIn(user, password)
      .then((user) => {
        console.log('Login correcto!');
        console.log(user);
        Auth.currentAuthenticatedUser().then((u) => {
          console.log('El usuario está autenticado');
          console.log(u);
          this.router.navigateByUrl(redirectUrl);
        });
      })
      .catch((err) => {
        console.error(err);
        this.errorMessage = err.message;
      });
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

  register() {
    alert('Not implemented, sorry!');
  }

  resetPassword() {
    alert('Not implemented, sorry!');
  }
}
