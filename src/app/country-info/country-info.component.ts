import { Component } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';

@Component({
  selector: 'app-country-info',
  standalone: true,
  imports: [WorldMapComponent],
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.css'
})
export class CountryInfoComponent {

}
