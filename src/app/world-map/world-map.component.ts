import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})

export class WorldMapComponent {

  countryInfo: any = {};
  private hoverSubject = new Subject<string>();

  constructor(private apiService: ApiService) {
    // prevent the user from making too many api calls:
    this.hoverSubject.pipe(
      debounceTime(300) // wait for 300 milliseconds before making the call
    ).subscribe((country: string) => {
      // set the country info via api service:
      this.apiService.setCountryInfo(country).subscribe((data: any) => {
        this.countryInfo = { ...data };
      });
    });
  }

  setCountryData(event: any) {
    const country = event.target.id;
    this.hoverSubject.next(country);
  }
}