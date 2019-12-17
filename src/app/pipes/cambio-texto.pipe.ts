import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cambioTexto'
})
export class CambioTextoPipe implements PipeTransform {

  transform(categoria: any, ...args: any): any {

    if ( categoria === 'expansion.com,marketingguerrilla.es,elblogsalmon.com') {
      return 'NEGOCIOS';
    }
    if ( categoria === 'espinof.com,elseptimoarte.net') {
      return 'ENTRETENIMIENTO';
    }
    if ( categoria === 'elpais.com,elmundo.es,elespanol.com') {
      return 'ACTUALIDAD';
    }
    if ( categoria === 'vitonica.com,infosalus.com') {
      return 'SALUD';
    }
    if ( categoria === 'muyinteresante.es,tendencias21.net,xatakaciencia.com') {
      return 'CIENCIA';
    }
    if ( categoria === 'as.com,marca.com') {
      return 'DEPORTES';
    }
    if ( categoria === 'genbeta.com,xataka.com,applesfera.com,xatakandroid.com,xatakamovil.com') {
      return 'TECNOLOGIA';
    }
    if ( categoria === 'vidaextra.com,hobbyconsolas.com,zonared.com') {
      return 'VIDEOJUEGOS';
    }
  }
}
