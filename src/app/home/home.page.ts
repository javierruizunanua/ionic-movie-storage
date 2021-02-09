import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamedbService } from '../core/gamedb.service';
import { IGame } from '../share/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public games: IGame[];
  gamesinit: IGame[] = [
    {
      id: '1',
      name: 'Fifa 21',
      genre: 'Deporte',
      date: '2020',
      cover:'https://media.extra.com/s/aurora/100193034_800/FIFA-21-Deluxe-PS4?locale=en-GB,en-*,*&$Listing-Product-2x$',
      description: `FIFA 21 es un videojuego de simulación de fútbol del año 2020 
      disponible para Microsoft Windows, PlayStation 4, Xbox One y Nintendo Switch 
      el 9 de octubre de 2020, y aparte es el primer videojuego de la serie FIFA para Google Stadia, 
      PlayStation 5 y Xbox Series X|S.`,
    },
    {
      id: '2',
      name: 'Read Dead Redemption 2',
      genre: 'Acción, Western, Atracos',
      date: '2018',
      cover: 'https://i.pinimg.com/originals/4b/e0/45/4be0454eeb9364a40f75d80701017924.png',
      description: `Red Dead Redemption 2 es un videojuego de acción-aventura western, 
      en un mundo abierto y en perspectiva de primera y tercera persona, ​
      con componentes para un jugador y multijugador.​ Fue desarrollado por Rockstar Games. 
      Es la precuela de Red Dead Redemption y el tercer juego de la saga Red Dead.`
    }
  ];

  constructor(private gamedbService: GamedbService, private route: Router) { }

  ngOnInit() {
    // If the database is empty set initial values
    this.inicialization();
  }

  ionViewDidEnter(){
    // Remove elements if it already has values
   if(this.games !== undefined ){
     this.games.splice(0);
   }
   this.retrieveValues();
 }

 inicialization() {
   if (this.gamedbService.empty()) {
     this.gamesinit.forEach(game => {
       this.gamedbService.setItem(game.id, game);
     });
   }
 }

 retrieveValues(){
   // Retrieve values
   this.gamedbService.getAll().then(
     (data) => this.games = data 
    );
 }

 gameTapped(game) {
   this.route.navigate(['details', game.id]);
 }

}
