import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamedbService } from '../core/gamedb.service';
import { IGame } from '../share/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
  id: string;
  public game: IGame;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private gamedbService: GamedbService,
    public toastController: ToastController
  ) { }


  ngOnInit() {

    this.id = this.activatedrouter.snapshot.params.id;
    this.gamedbService.getItem(this.id).then(
      (data:IGame)=> this.game = data
    );
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
            this.gamedbService.remove(id);
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