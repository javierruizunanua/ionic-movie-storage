import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { GamecrudService } from '../core/gamecrud.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
  public id: string;
  public game: IGame;
  public games: IGame[];

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private gamecrudService: GamecrudService,
    public toastController: ToastController
  ) { }


  ngOnInit() {

    this.getGame();

  }

  getGame() {
    this.id = this.activatedrouter.snapshot.params.id;

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
        });
        console.log(this.games);
        
        this.games.forEach( element => {
            if(element.id = this.id){
              this.game = element;
              console.log(this.game);
            }
          
        
        });
    });

   
  }
 
  editRecord(game){
    this.router.navigate(['edit',game.id])
  }
  
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Eliminar juego',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.gamecrudService.delete_Game(id);
            this.router.navigate(['home']);
          }
        },
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

  toast.present();
  }

 }