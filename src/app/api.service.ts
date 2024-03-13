import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  // World Bank API
  fetchWBCountryInfo(country: string) { // `country` arg is a 2 char country code
    let api = `https://api.worldbank.org/v2/country/${country}?format=json`;

    return this.http.get(api)
  }

  // GeoNames API
  fetchGNCountryInfo(country: string) { // `country` arg is a 2 char country code
    let api = `https://secure.geonames.org/countryInfoJSON?country=${country}&username=imbrandonj`;

    return this.http.get(api);
  }


  // method to set `subject` country info object making 2 api calls
  setCountryInfo(country: string) {  // `country` arg is a 2 char country code
    let subject = new Subject();

    // calling the GeoNames API to set country, capital, population, continent, and currency:
    this.fetchGNCountryInfo(country).subscribe((geoData: any) => {

      // calling the World Bank API to set region & income level:
      this.fetchWBCountryInfo(country).subscribe((wbData: any) => {

        const countryInfo: any = {};

        // append the GeoNames API data
        countryInfo.country = geoData.geonames[0]?.countryName || 'No Data';
        countryInfo.capital = 'Capital: ' + (geoData.geonames[0]?.capital || 'No Data');
        countryInfo.population = 'Population: ' + (geoData.geonames[0]?.population || 'No Data');
        countryInfo.continent = 'Continent: ' + (geoData.geonames[0]?.continentName || 'No Data');
        countryInfo.currency = 'Currency: ' + (geoData.geonames[0]?.currencyCode || 'No Data')

        // append the World Bank API data
        // certain countries do not contain data in the World Bank API, thus try/catch
        try {
          countryInfo.region = 'Region: ' + wbData[1][0].region.value;
          countryInfo.income = 'Income: ' + wbData[1][0].incomeLevel.value;
        }

        catch (error) {
          countryInfo.region = 'Region: ' + 'No Data';
          countryInfo.income = 'Income: ' + 'No Data';
        }

        subject.next(countryInfo);
        subject.complete();
      });
    });

    return subject.asObservable();
  }
}
