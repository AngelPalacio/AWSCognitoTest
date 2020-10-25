import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { SharedStateService } from '../shared-state.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedStateService: SharedStateService
  ) {}

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
    this.loading = true;
    this.submitted = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.login(this.f.username.value, this.f.password.value, 'user-details');
  }

  login(user, password, redirectUrl) {
    Auth.signIn(user, password)
      .then((res) => {
        console.log('Login done');
        console.log(res);
        Auth.currentAuthenticatedUser().then((authUser) => {
          console.log('User is logged it');
          console.log(authUser);
          this.sharedStateService.setLoggedUser(authUser);
          this.router.navigateByUrl(redirectUrl);
          this.loading = false;
        });
      })
      .catch((err) => {
        console.error(err);
        this.errorMessage = err.message;
        this.loading = false;
      });
  }

  register() {
    alert('Not implemented, sorry!');
  }

  resetPassword() {
    alert('Not implemented, sorry!');
  }
}
