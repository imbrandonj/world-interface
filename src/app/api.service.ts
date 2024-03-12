import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  fetchCountryInfo(country: string) { // `country` arg is a 2 char country code
    let api = `https://api.worldbank.org/v2/country/${country}?format=json`

    return this.http.get(api)
  }

  setCountryInfo(country: string) {  // `country` arg is a 2 char country code
    let subject = new Subject();

    // calling the api and setting the country info:
    this.fetchCountryInfo(country).subscribe((data: any) => {
      try {
      subject.next({
        country: data[1][0].name,
        capital: 'Capital: ' + data[1][0].capitalCity,
        region: 'Region: ' + data[1][0].region.value,
        income: 'Income: ' + data[1][0].incomeLevel.value,
      })}

      // api does not contain information:
      catch (error) {
        subject.next({
        country: 'Country: Unknown',
        capital: 'Capital: No Data',
        region: 'Region: No Data',
        income: 'Income: No Data',
        })}
    })

    return subject.asObservable();
  }
}
