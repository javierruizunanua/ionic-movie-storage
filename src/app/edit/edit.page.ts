import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GamedbService } from '../core/gamedb.service';
import { IGame } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {

  id: string;
  game:IGame;
  gameForm: FormGroup;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private gamedbService: GamedbService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    
    this.id = this.activatedroute.snapshot.params.id;
    this.gamedbService.getItem(this.id).then(
      (data:IGame) => {
        this.game = data
        this.gameForm = new FormGroup({
          name: new FormControl(this.game.name),
          genre: new FormControl(this.game.genre), 
          date: new FormControl(this.game.date),
          cover: new FormControl(this.game.cover),
          description: new FormControl(this.game.description),
        })

      }
    )
  
  }

  async onSubmit() {
    const toast = await this.toastController.create(
      {
        header: 'Actualizar juego',
        position: 'top',
        buttons: [
          {
            side: 'start',
            icon: 'save', 
            text: 'ACEPTAR', 
            handler: () => { 
              this.updateGame(); 
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

    updateGame() {
      this.game = this.gameForm.value; 
      //let nextKey = this.game.name.trim(); 
      //this.game.id = nextKey;
      //this.gamedbService.setItem(nextKey, this.game );
      this.gamedbService.setItem(this.game.id, this.game); 
      console.warn(this.gameForm.value); 
    }
 
}
