import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOffer } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  backEndApi = environment.backEndApi + "/property/offer/"

  constructor(
    private httpClient: HttpClient
  ) { }

  createOffer(body: {}): Observable<IOffer> {
    return this.httpClient.post(this.backEndApi + 'add', body) as Observable<IOffer>;
  }

  updateOffer(offerId: string, body: {}): Observable<IOffer> {
    return this.httpClient.put(this.backEndApi + offerId, body) as Observable<IOffer>;
  }  

  deleteOffer(offerId: string): Observable<IOffer> {
    return this.httpClient.delete(this.backEndApi + offerId) as Observable<IOffer>;
  } 
  
  readAllOffers (): Observable<IOffer[]> {
    return this.httpClient.get(this.backEndApi + 'all') as Observable<IOffer[]>;
  }

  readOfferById (idOffer: string): Observable<IOffer> {
    return this.httpClient.get(this.backEndApi + idOffer) as Observable<IOffer>;
  }
}
