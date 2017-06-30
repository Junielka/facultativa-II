import { Component,NgZone } from '@angular/core';
import { Platform, NavParams,ViewController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
    selector: 'page-modaleditar',
  templateUrl: 'modaleditar.html'
})

export class modaleditar{
   data = {
     key: '',
     titulo: '',
     categoria: '',
     descripcion: '',
     pdf: '',
     portada: '',
     autor: ''
   };
   boletin: FirebaseListObservable<any>;
  storageRef = firebase.storage().ref();
  image:any;
  fileImage:any;
  filePDF:any;
  rutaPortada:any;
  rutaPDF:any;
  urlPortada:any;
  key:any;

  constructor(
    public platform: Platform,
    public authData: AuthData,
    public params: NavParams,
    public viewCtrl: ViewController,
    public fireDatabase: AngularFireDatabase,
    public zone:NgZone
    
  ) {
      this.boletin = this.fireDatabase.list("/boletin");
      var items: any = this.params.get("dBoletin");
      this.key = items.$key;
      this.data.titulo = items.titulo;
      this.data.categoria = items.categoria;
      this.data.descripcion = items.descripcion;
      this.data.pdf = items.pdf;
      this.data.portada = items.portada;
      this.data.autor = items.autor;

      this.urlPortada = items.portada;
      console.log(this.data.key);
      //this.titulo = items.titulo;
   

      
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
        this.data.portada = path.result;
      });
      
    }
    reader.readAsDataURL(file);

  }

  editar(): void {
      console.log(this.fileImage.name);
    var items: any = this.data;
  
    if (this.fileImage.name == "" && this.filePDF.name == ""){
      alert(items.titulo);
     this.boletin.update(this.key,{
                        titulo: items.titulo,
                        autor: items.autor,
                        categoria: items.categoria,
                        descripcion: items.descripcion,
                        portada: this.urlPortada,
                        pdf: this.data.pdf
                      });
                           
                                      
    }else if (this.fileImage.name == ""){
        this.storageRef.child("pdf/" +this.data.key).put(this.filePDF).then((snapshot) => {
          this.storageRef.child("pdf/"+ this.data.key).getDownloadURL().then((urlPDF)=>{
              this.zone.run(()=>{
                            this.boletin.update(this.data.key,{
                                titulo: items.titulo,
                                autor: items.autor,
                                categoria: items.categoria,
                                descripcion: items.descripcion,
                                portada: this.urlPortada,
                                pdf: urlPDF
                              });
                      });
                    });
                    
              });            
          
    }else if (this.filePDF.name == ""){
        this.storageRef.child("imagenes/" +this.data.key).put(this.fileImage).then((snapshot) => {
          this.storageRef.child("imagenes/"+ this.data.key).getDownloadURL().then((urlImage)=>{
              this.zone.run(()=>{
                  this.boletin.update(this.data.key,{
                                titulo: items.titulo,
                                autor: items.autor,
                                categoria: items.categoria,
                                descripcion: items.descripcion,
                                portada: urlImage,
                                pdf: this.data.pdf
                              });
                            });
                        });    
                                       
              });  
               
    }else{
      this.storageRef.child("imagenes/" +this.data.key).put(this.fileImage).then((snapshot) => {
        this.storageRef.child("pdf/" +this.data.key).put(this.filePDF).then((snapshot) => {
            this.storageRef.child("imagenes/"+ this.data.key).getDownloadURL().then((urlImage)=>{
              this.zone.run(()=>{
                this.storageRef.child("pdf/"+ this.data.key).getDownloadURL().then((urlPDF)=>{
                  this.zone.run(()=>{
                     this.boletin.update(this.data.key,{
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
    

        });
    });
    }


  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

 
}