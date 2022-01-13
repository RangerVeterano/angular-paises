import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //Url para nuestra peticion
  private apiUrl: string = 'https://restcountries.com/v2/';

  //Preparamos nuestros resultados de la busqueda para poder ser llamados
  private resultados: Country[] = []

  //Inyectamos nuestro servicio de peticiones http
  constructor(private http: HttpClient) { }

  //Nuestra funcion para las peticiones por paises
  //Retorna un objeto de tipo observable, pero como es un genérico tenemos que especificar el tipo de variable
  //Indicamos que el tipo de dato es de tipo Country y es un arreglo
  buscarPais(termino: string): Observable<Country[]> {

    //Creamos nuestra url para hacer la peticion
    const url: string = `${this.apiUrl}/name/${termino}`

    //Realizamos la peticion get y la retornamos
    //Como get es un genérico marcamos que el tipo como arreglo de country
    return this.http.get<Country[]>(url);
  }

  //metodo para buscar paises por medio de la capital
  buscarCapital(termino: string): Observable<Country[]> {

    //Creamos nuestra url para hacer la peticion
    const url: string = `${this.apiUrl}/capital/${termino}`

    //Realizamos la peticion get y la retornamos
    //Como get es un genérico marcamos que el tipo como arreglo de country
    return this.http.get<Country[]>(url);
  }

  getPaisAlpha(id: string): Observable<Country> {
    //Creamos nuestra url para hacer la peticion
    const url: string = `${this.apiUrl}/alpha/${id}`

    //Realizamos la peticion get y la retornamos
    //Como get es un genérico marcamos que el tipo como arreglo de country
    return this.http.get<Country>(url);
  }
}
