import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {


  //Para emitir un valor desde el componente hijo al componente padre
  //Para eso se crea un evento que se va a lanzar cuando se llame
  //Se tiene que especificar el tipo de variable que se va a emitir
  @Output() onEnter: EventEmitter<string> = new EventEmitter()

  //Creamos nustro evento que nos permitirá saber cuando se estan pulsando 
  //las teclas y cuando se dejan de pulsar las teclas
  @Output() onDebounce: EventEmitter<string> = new EventEmitter()
  debouncer: Subject<string> = new Subject();

  //Este termino se recoge del html por la vinculacion
  termino: string = '';

  //Variable para el nombre del buscador
  @Input() placeholder:string = '';

  //Este componente solo se dispara una vez cuando es creado
  ngOnInit(): void {
    //el pipe con el debounceTime quiere decir que no haga nada con el susbcribe hasta que no pasen 300 milisegundos de sin actividad
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(valor => {

        //Mandamos nuestro termino para mostrar las sujerencias
        this.onDebounce.emit(valor)
      })
  }

  //Metodo que lanza nuestro evento al padre para buscar paises
  buscar() {

    //Llamamos nuestro evento para enviar nuestra busqueda al componente padre
    this.onEnter.emit(this.termino)

  }

  // Metodo para detectar cuando una tecla es pulsada en nuesto input
  teclaPresionada() {

    this.debouncer.next(this.termino)
  }


}
