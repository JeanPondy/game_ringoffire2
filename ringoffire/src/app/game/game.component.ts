import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component'; // Hinzugefügt, um die Dialog-Komponente zu importieren
import {MatFormFieldModule} from '@angular/material/form-field';
import {  GameInfoComponent } from '../game-info/game-info.component';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, GameInfoComponent ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor( public dialog: MatDialog) {
    this.game = new Game(); // Initialisierung des Spiels im Konstruktor
   
  }

  ngOnInit(): void {
   
  }

  newGame() {
    this.game = new Game();
  
  }

  takeCard() {
    /* nur this takeCardAnimation false ist denn wird alles aus geführt */
    if (!this.takeCardAnimation){ 
    this.currentCard = this.game.stack.pop()!;
    console.log(this.currentCard)
    this.takeCardAnimation = true;
   
    console.log('New card:' + this.currentCard);
    console.log('Game is', this.game);

    /* Nächsten Spieler auswählen */
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;


/* die Animation nach 1500s wiederholen */
    setTimeout(()  => {
      this.game.playedCards.push(this.currentCard);
      this.takeCardAnimation = false;
    }, 1000); // muss gleiche Zeit wie die Animation sein
  }
  }

  /*  takeCard() {
    if (this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop()!;
      console.log(this.currentCard);
      this.takeCardAnimation = true;
    } else {
      console.log('No more cards in the stack');
    }
  } */
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  
      dialogRef.afterClosed().subscribe((name: string)=> {
        //console.log('The dialog was closed', name);
        if(name && name.length > 0){
          this.game.players.push(name);
        }
       
       
      });
    }
  


}
