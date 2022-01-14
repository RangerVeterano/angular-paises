import { Component, Input } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li { cursor:pointer}
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';//String vinculado para realizar la busqueda de paises
  hayError: boolean = false; //indicador para mostrar error/ la tabla de paises
  paises: Country[] = []; //Arreglo con todos nuestro paises
  paisesSugeridos: Country[] = []; //Arreglo con todos nuestro paises Preparados para las sugerencias
  mostrarSuegerencias:boolean = false; //variable para mostrar o esconder las sugerencias

  //inyectamos nuestro servicio de paises
  constructor(private paisService: PaisService) { }

  //Metodo para buscar la consulta de los paises
  buscar(termino: string) {
    //Lo ponemos en este punto para que no se muestren los errores
    this.hayError = false; //Marcamos que no tenemos error
    this.termino = termino//Vinculamos el termino recibido con el termino del componente
    this.mostrarSuegerencias = false;//Escondemos nuestras sugerencias


    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises) => {
          //Aqui tenemos nuestra respuesta completa

          //Comprobacion de que no tenga un status 404 en una respuesta 200
          if (this.comprobar404(paises)) {
            this.hayError = true;
            this.paises = []
            return;
          }

          //Asignamos la respuesta de nuestros paises a nuestro arreglo local
          this.paises = paises;

        },
        error: (err) => {
          this.hayError = true; //En caso de error marcamos que tenemos error
          this.paises = [];
        }
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    //Marcamos el mismo valor en el buscador que en la sugerencia
    this.termino = termino;
    this.mostrarSuegerencias = true;

    //Realizamos una busqueda de los paises con el termino de la peticion
    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises) => {

          //comprobamos que no nos de un 200 con estado de 404
          if (this.comprobar404(paises)) {
            this.paisesSugeridos = [];//vaciamos paises sugeridos
            return;
          }

          //Guardamos los resultados en nuestra variable local
          //solo mostramos los 3 primeros resultados
          this.paisesSugeridos = paises.splice(0, 5)
        },
        error: (err) => {
          // Si nos da erro vaciamos la lista de paises sugeridos
          this.paisesSugeridos = [];
        }
      })
  }

  //Esta funcion es para comprobar que la respuesta de la peticion no sea un 200 con el estado de 404 
  private comprobar404(r: any): boolean {
    //Si tiene el 404 da error sino es false
    return (r.status === 404) ? true : false;
  }

}
