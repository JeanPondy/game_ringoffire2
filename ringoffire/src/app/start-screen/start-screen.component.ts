import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import des Routers

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'] // Korrektur hier: styleUrl -> styleUrls
})
export class StartScreenComponent {

  constructor(private router: Router) { }

  newGame() {
    // start game
    this.router.navigateByUrl('/game');
  }

}
