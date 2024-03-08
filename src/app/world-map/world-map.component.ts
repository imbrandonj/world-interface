import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent {

  countryInfo: any = {};

  constructor(private apiService: ApiService) {  }

  setCountryData(event: any) {
    this.apiService.setCountryInfo(event.target.id).subscribe((data: any) => {
      this.countryInfo = {
        ...data
      }
    });
  }
  
}
