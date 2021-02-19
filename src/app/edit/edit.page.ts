import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GamecrudService } from '../core/gamecrud.service';
import { IGame } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {

  id: string;
  public game: IGame;
  games: IGame[];
  gameForm: FormGroup;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private gamecrudService: GamecrudService,
    private toastController: ToastController
  ) { }

  ngOnInit() {

    this.getGame();
  
  }

  getGame() {

    this.id = this.activatedroute.snapshot.params.id;


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
        this.games.forEach( element =>{
            if(element.id = this.id) {
              this.game = element;
              console.log(this.game);

              this.gameForm.setValue({
                cover: this.game.cover,
                genre: this.game.genre, 
                date: this.game.date,
                name: this.game.name,
                description: this.game.description
              })
            }   
        });
    });

    this.gameForm = new FormGroup({
      name: new FormControl(''),
      genre: new FormControl(''), 
      date: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });

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
      
      this.gamecrudService.update_Game('VxmaVjfHjUq2vw9TnpFY', this.game);
    }
 
}
