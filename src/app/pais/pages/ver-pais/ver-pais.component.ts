import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  //inicializamos nuestros paises le indicamos a typescript 
  //que sabemos lo que hacemos aparte de esa forma no nos saca error
  pais!: Country;

  //Inyectamos el servicio que nos permite escuchar los cambios de la url 
  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    //Esto devuelve un observable que en nuestro caso es la url
    //Para cambiar al observador de nuestra peticion http pasamos por la pipe
    //y con el paquete switchMap podemos cambiar de un observador a otro
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisAlpha(id)),
        tap(console.log) //imprime en consola el producto del switchMap
      )
      .subscribe(pais => {
        this.pais = pais;
      })

    //Otra forma de hacer lo de abajo

    // this.activateRoute.params
    //   .subscribe((params: any) => {
    //     console.log(params.id);
    // this.paisService.getPaisAlpha(params.id)
    // .subscribe({
    //   next: (pais) => {
    //     //Aqui tenemos nuestra respuesta completa
    //     console.log(pais);
    //     //Comprobacion de que no tenga un status 404 en una respuesta 200
    //     if (this.comprobar404(pais)) {
    //       // this.hayError = true;
    //       // this.paises = []
    //       return;
    //     }
    //   },
    //   error: (err) => {
    //     // this.hayError = true; //En caso de error marcamos que tenemos error
    //     // this.paises = [];
    //   }
    // });
    //})

  }

  //Esta funcion es para comprobar que la respuesta de la peticion no sea un 200 con el estado de 404 
  private comprobar404(r: any): boolean {
    //Si tiene el 404 da error sino es false
    return (r.status === 404) ? true : false;
  }

}
