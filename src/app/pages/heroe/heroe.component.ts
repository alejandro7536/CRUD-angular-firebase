import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel(null, '', '');

  constructor(
    private heroesService: HeroesService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id).subscribe(
        res => {
          if ( res === null) {
            this.router.navigateByUrl('/heroes');
            return;
          }
          this.heroe = res;
          this.heroe.id = id;
        },
      );
    }
  }

  guardar(form: NgForm) {

    if ( form.invalid ) {
      console.log('Formulario no valido');
      Swal.fire({
        title: 'Upps',
        text: 'No haz completado el formulario',
        icon: 'info',
        showConfirmButton: true
      })
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Heroe',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {
     peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
     peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(res => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });

  }

}
