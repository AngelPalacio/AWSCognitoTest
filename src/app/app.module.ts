import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { LoginComponent } from './login/login.component';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-central-1:35af5f05-e242-4827-bdda-c64e41a7fa28',

    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'eu-central-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-central-1_d0zoKkOO3',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6b8amf4n9b37r8273o5p7521mu',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    //mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    //cookieStorage: {
    //// REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //    domain: '.yourdomain.com',
    //// OPTIONAL - Cookie path
    //    path: '/',
    //// OPTIONAL - Cookie expiration in days
    //    expires: 365,
    //// OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //    sameSite: "strict" | "lax",
    //// OPTIONAL - Cookie secure flag
    //// Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //    secure: true
    //},

    // OPTIONAL - customized storage object
    //storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    //authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    //clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    //oauth: {
    //    domain: 'your_cognito_domain',
    //    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    //    redirectSignIn: 'http://localhost:3000/',
    //    redirectSignOut: 'http://localhost:3000/',
    //    responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    //}
  },
});

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, AmplifyUIAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
