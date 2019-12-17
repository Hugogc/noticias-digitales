import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser,
               private socialSharing: SocialSharing,
               private actionSheetCtrl: ActionSheetController,
               private datalocalService: DataLocalService) { }

  ngOnInit() {}


  abrirNoticia() {
    const browser = this.iab.create( this.noticia.url, '_system' );

  }

  async lanzarMenu() {
    let guardaBorrarBtn;
    if ( this.enFavoritos ) {
      guardaBorrarBtn = {

        text: 'Borrar de favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.borrarNoticia( this.noticia );
        }
    };

    } else {
      guardaBorrarBtn = {

          text: 'Añadir a favoritos',
          icon: 'star',
          cssClass: 'action-dark',
          handler: () => {
            this.datalocalService.guardarNoticia( this.noticia );
          }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
       {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardaBorrarBtn,
       {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

}
