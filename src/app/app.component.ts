import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {InicioPage} from '../pages/inicio/inicio';


import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {


    platform.ready().then(() => {
     var config = {
        apiKey: "AIzaSyC_WdDuG7FKuhNFbdCXy5p0yV7hmkQcDYY",
        authDomain: "boletin-informativo.firebaseapp.com",
        databaseURL: "https://boletin-informativo.firebaseio.com",
        projectId: "boletin-informativo",
        storageBucket: "boletin-informativo.appspot.com",
        messagingSenderId: "94481837676"
      };
      
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {

          if (!user) {
              console.log("not login");
              this.rootPage = TabsPage;


          } else {
              console.log("login");
              this.rootPage = HomePage;

          }

      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


/*

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyC_WdDuG7FKuhNFbdCXy5p0yV7hmkQcDYY",
        authDomain: "boletin-informativo.firebaseapp.com",
        databaseURL: "https://boletin-informativo.firebaseio.com",
        projectId: "boletin-informativo",
        storageBucket: "boletin-informativo.appspot.com",
        messagingSenderId: "94481837676"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {

          if (!user) {
              console.log("not login");
              this.rootPage = InicioPage


          } else {
              console.log("login");
              this.rootPage = HomePage;

          }

      });*/