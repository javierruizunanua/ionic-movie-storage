import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamecrudService } from '../core/gamecrud.service';
import { IGame } from '../share/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public games: IGame[];

  /*
      id: '2',
      name: 'Read Dead Redemption 2',
      genre: 'Acción, Western, Atracos',
      date: '2018',
      cover: 'https://i.pinimg.com/originals/4b/e0/45/4be0454eeb9364a40f75d80701017924.png',
      description: `Red Dead Redemption 2 es un videojuego de acción-aventura western, 
      en un mundo abierto y en perspectiva de primera y tercera persona, ​
      con componentes para un jugador y multijugador.​ Fue desarrollado por Rockstar Games. 
      Es la precuela de Red Dead Redemption y el tercer juego de la saga Red Dead.`
  */

  constructor(private gamecrudService: GamecrudService, private route: Router) { }

  ngOnInit() {
    this.retrieveValues();
  }


 retrieveValues(){
   // Retrieve values
   this.gamecrudService.read_Games().subscribe(data => {
    this.games = data.map(e => {
      return {
        id: e.payload.doc.id,
        name: e.payload.doc.data()['name'],
        genre: e.payload.doc.data()['genre'],
        date: e.payload.doc.data()['date'],
        cover: e.payload.doc.data()['cover'],
        description: e.payload.doc.data()['description']
      };
    })
  });

 }

 gameTapped(game) {
   this.route.navigate(['details', game.id]);
 }

}
