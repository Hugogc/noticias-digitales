import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;


  categorias: string[] = ['expansion.com,marketingguerrilla.es,elblogsalmon.com',
                          'espinof.com,elseptimoarte.net',
                          'elpais.com,elmundo.es,elespanol.com',
                          'vitonica.com,infosalus.com',
                          'muyinteresante.es,tendencias21.net,xatakaciencia.com',
                          'as.com,marca.com',
                          'genbeta.com,xataka.com,applesfera.com,xatakandroid.com,xatakamovil.com',
                          'vidaextra.com,hobbyconsolas.com,zonared.com'];
  noticias: Article[] = [];


  constructor( private noticiasService: NoticiasService ) {}


ngOnInit() {
  this.segment.value = this.categorias[0];
  this.cargarNoticias( this.categorias[0] );

}

cambioCategoria( event ) {
  this.noticias = [];
  this.cargarNoticias( event.detail.value );
}


cargarNoticias( categoria: string, event? ) {
  this.noticiasService.getTopHeadLinesCategoria( categoria )
        .subscribe( resp => {
          this.noticias.push( ...resp.articles );
          if ( event ) {
            event.target.complete();
          }

        });
}

loadData( event ) {
  this.cargarNoticias( this.segment.value, event );
}




}

