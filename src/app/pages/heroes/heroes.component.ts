import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;

  constructor(
    private heroeService: HeroesService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.heroeService.getHeroes().subscribe(
      res => {
        this.heroes = res;
        this.loading = false;

      }
    );
  }


  eliminar(heroe: HeroeModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Borrar a ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(res => {
      if (res.value) {

        this.heroes.splice(i, 1);

        this.heroeService.elimiarHeroe(heroe.id).subscribe();
      }
    });


  }

}
