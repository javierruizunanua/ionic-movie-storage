import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GamecrudService } from '../core/gamecrud.service';
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
    private gamecrudService: GamecrudService,
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

      let record = {};
      record['name'] = this.game.name;
      record['genre'] = this.game.genre;
      record['date'] = this.game.date;
      record['cover'] = this.game.cover;
      record['description'] = this.game.description;

      this.gamecrudService.create_Game(record);

    } 
  }