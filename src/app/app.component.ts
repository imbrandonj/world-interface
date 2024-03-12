import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSearchComponent } from './user-search/user-search.component';
import { WorldMapComponent } from './world-map/world-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserSearchComponent, WorldMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'World Interface';
}
