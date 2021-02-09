import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GamedbService } from '../core/gamedb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IGame } from '../share/interfaces';

@Component(
  { selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  }
)

export class CreatePage implements OnInit {
  game:IGame;
  gameForm: FormGroup;
  
  constructor(
    private router: Router,
    private gamedbService: GamedbService,
    public toastController: ToastController
    ) { }
    
  ngOnInit() {
    this.gameForm = new FormGroup(
      {
        name: new FormControl(''),
        genre: new FormControl(''), 
        date: new FormControl(''),
        cover: new FormControl(''),
        description: new FormControl(''),
      }
    );
  }
 
  async onSubmit() {
    const toast = await this.toastController.create(
      {
        header: 'Guardar juego',
        position: 'top',
        buttons: [
          {
            side: 'start',
            icon: 'save', 
            text: 'ACEPTAR', 
            handler: () => { 
              this.saveGame(); 
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


    saveGame() { 
      this.game = this.gameForm.value; 
      let nextKey = this.game.name.trim(); 
      this.game.id = nextKey; 
      this.gamedbService.setItem(nextKey, this.game ); 
      console.warn(this.gameForm.value); 
    } 
  }