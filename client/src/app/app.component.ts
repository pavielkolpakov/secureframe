import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoachesComponent } from './components/coaches/coaches.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoachesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
