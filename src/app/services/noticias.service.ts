import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  categoriaActual = '';
  categoriaPage = 0;

  headLinesPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>( query, { headers } );

  }

  getTopHeadlines() {
    this.headLinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?language=es&page=${ this.headLinesPage }`);
  }

  getTopHeadLinesCategoria( categoria: string ) {
    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
      }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/everything?domains=${ categoria }&page=${ this.categoriaPage }`);

  }


}
