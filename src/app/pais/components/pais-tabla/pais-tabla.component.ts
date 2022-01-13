import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
  ]
})
export class PaisTablaComponent implements OnInit {

  //recogemos nuestra variable del componente padre si no tiene nada la inicializamos vacía
 @Input() paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

}
