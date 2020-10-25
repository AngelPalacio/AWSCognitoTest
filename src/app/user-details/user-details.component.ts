import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { SharedStateService } from '../shared-state.service';
import { IUser } from '../user-model/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: IUser;
  form: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private sharedStateService: SharedStateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.user = this.sharedStateService.LoggedUser;
    this.form = this.formBuilder.group({
      nickname: [this.user.nickname],
      email: [this.user.email],
      phone1: [this.user.phone1],
      phone2: [this.user.phone2],
      benutzerErstellt: [this.user.benutzerErstellt],
    });
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const newAttributes = {};
    if (this.f.nickname.value)
      newAttributes['preferred_username'] = this.f.nickname.value;
    if (this.f.email.value) newAttributes['email'] = this.f.email.value;
    if (this.f.phone1.value)
      newAttributes['phone_number'] = this.f.phone1.value;
    if (this.f.phone2.value)
      newAttributes['custom:phone2'] = this.f.phone2.value;
    if (this.f.benutzerErstellt.value)
      newAttributes['custom:BenutzerErstellt'] = this.f.benutzerErstellt.value;

    const newUser = { username: this.user.name, attributes: newAttributes };

    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('Actualizando datos...');
        Auth.updateUserAttributes(user, newAttributes)
          .then((data) => {
            this.sharedStateService.setLoggedUser(newUser);
            this.user = this.sharedStateService.LoggedUser;
            this.loading = false;
            this.successMessage = 'Daten gespeichert';
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
            this.errorMessage = err.message;
          });
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = err.message;
      });
  }
}
