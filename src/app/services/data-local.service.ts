import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor( private storage: Storage,
               private toastController: ToastController ) {

    this.cargarFavoritos();
  }

  noticias: Article[] = [];


  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'medium',
      mode: 'ios',
    });
    toast.present();
  }

  guardarNoticia( noticia: Article ) {
    const existe = this.noticias.find( noti => noti.title === noticia.title );
    if (!existe ) {
     this.noticias.unshift( noticia );
     this.storage.set('favoritos', this.noticias );
     this.presentToast( 'Agregado a favoritos');
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get( 'favoritos');
    if ( favoritos ) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia( noticia: Article ) {
  this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
  this.storage.set('favoritos', this.noticias );
  this.presentToast( 'Borrado de favoritos');
  }

}
