import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

boletin: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,private navParams: NavParams,   public fireDatabase: AngularFireDatabase,){
    let key = navParams.get("key");
     this.boletin = this.fireDatabase.list('/boletin',{
              query:{
                orderByKey:  true,
                equalTo: key,
              }
            });
}


}
