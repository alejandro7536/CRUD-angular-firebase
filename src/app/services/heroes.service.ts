import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  base_url = 'https://login-app-f8fa5.firebaseio.com';

  constructor(
    private http: HttpClient
  ) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.base_url}/heroes.json`, heroe).pipe(
      map((res: any) => {
        heroe.id = res.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.base_url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.base_url}/heroes.json`).pipe(
      map(this.crearArregloHeroes)
    );
  }


  private crearArregloHeroes(heroesObj: object) {
    const heroes: HeroeModel[] = [];

    if (heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }

  getHeroe(id: string) {
    return this.http.get<HeroeModel>(`${this.base_url}/heroes/${id}.json`);
  }


  elimiarHeroe(id: string) {
    return this.http.delete(`${this.base_url}/heroes/${id}.json`);
  }
}
