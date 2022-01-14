import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent {

  // Creamos un arreglo con las 5 posibles regiones
  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];

  //Variable para almacenar que region está activa por el momento
  regionActiva: string = '';

  //Creamos nuestro arreglo de pasises para poder mostrarlos
  paises: Country[] = [];

  //Inyectamos nuestro servicio de paises
  constructor(private paisService: PaisService) { }

  //Metodo para saber que clase se tiene que aplicar a los botones
  getClaseCSS(region: string) {

    //Si la region activa es la misma que la region recibida se cambia la clase para indicar que se ha activado la region
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  //Metodo para cambiar la region que se activa en el momento
  activarRegion(region: string) {

    //En el caso de que se busque la misma region que no haga nada
    if (region === this.regionActiva) { return; }

    this.regionActiva = region //marcamos la region enviada como la activa
    this.paises = []; //purgamos el anterior resultado

    // Realizamos nuestra busqueda de paises
    this.paisService.buscarRegion(region)
      .subscribe({
        next: (paises) => {

          //Guardamos los paises de la peticion en nuestra variable local 
          this.paises = paises
        }
      })
  }
}
