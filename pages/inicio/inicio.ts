import { Component,ViewChild,NgZone } from '@angular/core';
import {App,NavController,Slides,Platform, NavParams, ViewController,ModalController, AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { HomePage } from '../home/home';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  loginPage = Login;
 slides = [
    {
      
      image: "assets/img/5614.jpg",
    },
    {
     
      image: "assets/img/graduacion.jpg",
    },
    {
     
      image: "assets/img/danacion.jpg",
    }
  ];

    boletin: FirebaseListObservable<any>;


  constructor(public viewCtrl: ViewController, public appCtrl: App,public navCtrl: NavController,  public fireDatabase: AngularFireDatabase){
     this.boletin = this.fireDatabase.list('/boletin');
  }

  openLogin(){
    this.navCtrl.setRoot(Login);
  //  this.appCtrl.getRootNav().push(Signup);
}

details(keyparam){
  this.navCtrl.push(DetailsPage,{
    key: keyparam
  });
}

}

Component({
  template: `
  
<ion-header>
  <ion-toolbar>
    <ion-title>
      Crear boletin informativo
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios,windows">Cancel</span>
        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
    <form  (ngSubmit)="guardar()">
        <ion-list inset>

          <ion-item>
            <ion-label>Titulo</ion-label>
            <ion-input type="text" [(ngModel)]="data.titulo" name="titulo" autofocus></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Autor</ion-label>
            <ion-input type="text" [(ngModel)]="data.autor" name="autor"></ion-input>
          </ion-item>
         <ion-list>
          <ion-item>
            <ion-label>Categorias</ion-label>
            <ion-select [(ngModel)]="data.categoria" name="categoria" cancelText="Cancelar" okText="Aceptar!">
              <ion-option value="Salud" selected="true">Salud</ion-option>
              <ion-option value="Educación">Educación</ion-option>
              <ion-option value="Tecnología">Tecnología</ion-option>
              <ion-option value="Agronomía">Agronomía</ion-option>
              <ion-option value="Matematica">Matematica</ion-option>
              <ion-option value="Lengua y Literatura">Lengua y Literatura</ion-option>
            </ion-select>
          </ion-item>
        </ion-list>
          <ion-item>
            <ion-label>Descripción</ion-label>
            <ion-textarea [(ngModel)]="data.descripcion" name="descripcion"></ion-textarea>
          </ion-item>
            <ion-label>Portada</ion-label>
            <input type="file" (change)="selectFileImage($event)">

          <ion-grid>
          <ion-row>
            <ion-col col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3>
                <img [src]="image" *ngIf="image" style="margin:10px;">
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-label>PDF</ion-label>
            <input type="file" (change)="selectPDF($event)">
          <ion-grid>
          <ion-row>
            <ion-col col-md-6>
              <button ion-button color="primary"  type="submit" block>Guardar</button>
            </ion-col>
            <ion-col col-md-6>
              <button ion-button color="danger" (click)="dismiss()">Cancelar</button>
            </ion-col>

          </ion-row>
        </ion-grid>
          

        </ion-list>
    </form>
  

</ion-content>
`
})
export class modalcrearboletin {
  data = {};
 boletinInformativo: FirebaseListObservable<any>;
  storageRef = firebase.storage().ref();
  image:any;
  fileImage:any;
  filePDF:any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public fireDatabase: AngularFireDatabase,
    public zone:NgZone
  ) {
    
  }

  selectFileImage(e){
    
    this.fileImage= e.target.files[0];
    this.leerFoto(this.fileImage);
  }

  selectPDF(e){
    this.filePDF = e.target.files[0];
  }

  subirImagen(){
    console.log(this.fileImage)
    this.storageRef.child("imagenes/" +this.fileImage.name).put(this.fileImage).then((snapshot) => {
        console.log(snapshot);
    });
  }

  removeBoletin(boletin){
    this.boletinInformativo.remove(boletin.$key);
  }

  leerFoto(file){
    console.log(file);
    let reader = new FileReader();
    reader.onload = (e) =>{
      this.zone.run(()=>{
        let path:any = e.target;
        this.image = path.result;
      });
      
    }
    reader.readAsDataURL(file);

  }

  guardar(){
 
    var items: any = this.data;

        this.boletinInformativo.push({
            titulo: items.titulo,
            autor: items.autor,
            categoria: "Salud",
            descripcion: items.descripcion,
            portada: this.fileImage.name,
            pdf: this.filePDF.name
          });
 
  /*
   this.storageRef.child("imagenes/" +this.fileImage.name).put(this.fileImage).then((snapshot) => {
        this.storageRef.child("pdf/" +this.filePDF.name).put(this.filePDF).then((snapshot) => {
         
        });
    });
*/
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}