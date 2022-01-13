import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';//String vinculado para realizar la busqueda de paises
  hayError: boolean = false; //indicador para mostrar error/ la tabla de paises
  paises: Country[] = []; //Arreglo con todos nuestro paises

  //Inyectamos nuestro servicio de paises
  constructor(private paisService: PaisService) { }



  buscar(arg: string) {

    this.hayError = false; //Marcamos que no tenemos error
    this.termino = arg//Vinculamos el termino recibido con el termino del componente

    this.paisService.buscarCapital(arg)
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
          //En caso de que nos de error poder gestionar que hacemos
          this.hayError = true; //En caso de error marcamos que tenemos error
          this.paises = [];
        }
      });

  }

  //Esta funcion es para comprobar que la respuesta de la peticion no sea un 200 con el estado de 404 
  private comprobar404(r: any): boolean {
    //Si tiene el 404 da error sino es false
    return (r.status === 404) ? true : false;
  }
}
