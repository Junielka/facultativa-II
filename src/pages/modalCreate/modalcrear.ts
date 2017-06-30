import { Component,NgZone } from '@angular/core';
import { Platform, NavParams,ViewController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
    selector: 'page-modalcrear',
  templateUrl: 'modalcrear.html'
})

export class modalcrear{
   data = {};
   boletin: FirebaseListObservable<any>;
  storageRef = firebase.storage().ref();
  image:any;
  fileImage:any;
  filePDF:any;
  rutaPortada:any;
  rutaPDF:any;

  constructor(
    public platform: Platform,
    public authData: AuthData,
    public params: NavParams,
    public viewCtrl: ViewController,
    public fireDatabase: AngularFireDatabase,
    public zone:NgZone
  ) {
      this.boletin = this.fireDatabase.list("/boletin");

      
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

  guardar(data): void {
 
    var items: any = this.data;

   this.storageRef.child("imagenes/" +this.fileImage.name).put(this.fileImage).then((snapshot) => {
        this.storageRef.child("pdf/" +this.filePDF.name).put(this.filePDF).then((snapshot) => {
            this.storageRef.child("imagenes/"+ this.fileImage.name).getDownloadURL().then((urlImage)=>{
              this.zone.run(()=>{
                this.storageRef.child("pdf/"+ this.filePDF.name).getDownloadURL().then((urlPDF)=>{
                  this.zone.run(()=>{
                     this.boletin.push({
                        titulo: items.titulo,
                        autor: items.autor,
                        categoria: items.categoria,
                        descripcion: items.descripcion,
                        portada: urlImage,
                        pdf: urlPDF
                      });
                  });
                });
              });
            });

           

            
         

           

           this.viewCtrl.dismiss(data);

        });
    });

  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

 
}