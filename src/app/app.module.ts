import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage, modalcrearboletin} from '../pages/home/home';
import { modalcrear } from '../pages/modalCreate/modalcrear';
import { modaleditar } from '../pages/modalEdit/modaleditar';
import {InicioPage} from '../pages/inicio/inicio';
import { TabsPage } from '../pages/tabs/tabs';

import { Login } from '../pages/login/login';

import {ResetPassword}from '../pages/reset-password/reset-password';
import {Signup} from '../pages/signup/signup';

import {DetailsPage} from '../pages/details/details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthData } from '../providers/auth-data';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import * as firebase from 'firebase';




export const firebaseconfig = {
    apiKey: "AIzaSyC_WdDuG7FKuhNFbdCXy5p0yV7hmkQcDYY",
    authDomain: "boletin-informativo.firebaseapp.com",
    databaseURL: "https://boletin-informativo.firebaseio.com",
    projectId: "boletin-informativo",
    storageBucket: "boletin-informativo.appspot.com",
    messagingSenderId: "94481837676"
};



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
     modalcrear,
     modalcrearboletin,
     modaleditar,
     InicioPage,
   DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig,'boletin-informativo'),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
    modalcrear,
    modalcrearboletin,
    modaleditar,
    InicioPage,
  DetailsPage
  ],
  providers: [
      AuthData,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
