import { Component,NgZone } from '@angular/core';
import {NavController,Platform, NavParams, ViewController,ModalController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { modalcrear } from '../modalCreate/modalcrear';
import { modaleditar } from '../modalEdit/modaleditar';

import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  boletin: FirebaseListObservable<any>;
  storageRef = firebase.storage().ref();
  image:any;
  file:any;



    constructor(public navCtrl: NavController, public authData: AuthData,
        public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase,
    public modalCtrl : ModalController, public zone:NgZone) {
  
            this.boletin = this.fireDatabase.list('/boletin');
         

  }

  openModal(){
    let modal = this.modalCtrl.create(modalcrear);
   
    modal.present();
  }
  openModalEdit(dBoletin){
    let modal = this.modalCtrl.create(modaleditar, {"dBoletin": dBoletin});
    modal.present();
      
  }

/*

  downloadFile()
    {
      const fileTransfer: TransferObject = this.transfer.create();
        const url = 'https://firebasestorage.googleapis.com/v0/b/boletin-informativo.appspot.com/o/imagenes%2Fmanual%20de%20usuario%20SDG.pdf?alt=media&token=ea20b4d4-4cfa-4400-b08a-75de4e567200';

        fileTransfer.download(url, this.file.dataDirectory  + 'manual.pdf').then((entry) => 
        {
            console.log('download complete: ' + entry.toURL());
        }, (error) => {
            // handle error
        });
    }*/
  
  selectFile(e){
    
    this.file= e.target.files[0];
    this.leerFoto(this.file);
  }
  subirImagen(){
    console.log(this.file)
    this.storageRef.child("imagenes/" +this.file.name).put(this.file).then((snapshot) => {
        console.log(snapshot);
    });
  }

  removeBoletin(boletin){
    this.boletin.remove(boletin.$key);
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

  updateBoletin(boletin){
    let newBoletinModal = this.alertCtrl.create({
      title: 'Actualizar boletin informativo',
      message: "Detalle el nuevo boletin",
      inputs: [
        {
          name: "titulo",
          placeholder: "Titulo",
          value: boletin.titulo
        },  
        {
          name: "autor",
          placeholder: "Autor del boletin",
          value:boletin.autor
        },
        {
          name: "categoria",
          placeholder: "Categoria",
          value: boletin.categoria
        },
        {
          name: "descripcion",
          placeholder: "Descripción",
          value: boletin.descripcion
        },
        {
          value: "Portada",
          type: "file",
          handler: data=>{
            
          }
        },
        {
          value: "PDF",
          type: "button",
          handler: data=>{
            
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role:'cancel',
          handler: data => {

          }
        },{
          text: "Actualizar",

          handler: data => {
            this.boletin.update(boletin.$key,{
              titulo: data.titulo,
              autor: data.autor,
              categoria: data.categoria,
              descripcion: data.descripcion
            });
          }
        }
      ]
    });
    newBoletinModal.present();
  }


  createBoletin(){
    let newBoletinModal = this.alertCtrl.create({
      title: 'Nuevo boletin informativo',
      message: "Detalle el nuevo boletin",
      inputs: [
        {
          name: "titulo",
          placeholder: "Titulo"
        },  
        {
          name: "autor",
          placeholder: "Autor del boletin"
        },
        {
          name: "categoria",
          placeholder: "Categoria"
        },
        {
          name: "descripcion",
          placeholder: "Descripción"
        },{
          name:"file",
          type: "file",
          handler: (data: any) =>{
            alert('hola');
          }
         
        },
        {
          value: "PDF",
          type: "button",
          handler: data=>{
            
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {

          }
        },{
          text: "Guardar",
          handler: data => {
            this.boletin.push({
              titulo: data.titulo,
              autor: data.autor,
              categoria: data.categoria,
              descripcion: data.descripcion,
              imagen: "dfadsfadsf",
              pdf: "adfadsfasdfasdfadsf"
            });
          }
        }
      ]
    });
    newBoletinModal.present(newBoletinModal);
  }



  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
}

@Component({
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