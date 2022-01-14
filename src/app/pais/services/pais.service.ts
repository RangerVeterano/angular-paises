import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //Url para nuestra peticion
  private apiUrl: string = 'https://restcountries.com/v2/';

  // Creamos nuestro getter para mandar los parámetros de las peticions http
  get httpParams() {
    //nos creamos una constate para almacenar los parametros de la peticion a realizar
    return new HttpParams()
      .set('fields', 'name,capital,alpha2Code,flag,population');
  }

  //Inyectamos nuestro servicio de peticiones http
  constructor(private http: HttpClient) { }

  //Nuestra funcion para las peticiones por paises
  //Retorna un objeto de tipo observable, pero como es un genérico tenemos que especificar el tipo de variable
  //Indicamos que el tipo de dato es de tipo Country y es un arreglo
  buscarPais(termino: string): Observable<Country[]> {

    //Creamos nuestra url para hacer la peticion
    const url: string = `${this.apiUrl}name/${termino}`

    //Realizamos la peticion get y la retornamos
    //Como get es un genérico marcamos que el tipo como arreglo de country
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  //metodo para buscar paises por medio de la capital
  buscarCapital(termino: string): Observable<Country[]> {

    //Creamos nuestra url para hacer la peticion
    const url: string = `${this.apiUrl}capital/${termino}`

    //Realizamos la peticion get y la retornamos
    //Como get es un genérico marcamos que el tipo como arreglo de country
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisAlpha(id: string): Observable<Country> {
    //Creamos nuestra url para hacer la peticion
    const url: string = `${this.apiUrl}alpha/${id}`

    //Realizamos la peticion get y la retornamos
    //Como get es un genérico marcamos que el tipo como arreglo de country
    return this.http.get<Country>(url);
  }

  //Metodo para realizar las busquedas de paises por medio de la region
  buscarRegion(region: string): Observable<Country[]> {



    //Preparamos nuestra url para la peticion
    const url: string = `${this.apiUrl}regionalbloc/${region}`;

    //Devolvemos nuestro arreglo de Paises
    //Cargamos nuestros parámetros y al tener el mismo nombre se puede acortar
    return this.http.get<Country[]>(url, { params: this.httpParams })
      .pipe(
        tap(console.log)
      );

  }
}
