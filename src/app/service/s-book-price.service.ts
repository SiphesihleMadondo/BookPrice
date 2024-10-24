import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BookPrice } from '../models/book-price'
import { Partner } from '../models/partner'

@Injectable({
  providedIn: 'root'
})
export class SBookPriceService {
  // Access URL
  url: string = '/api/BookPrices'
  error: any | null

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (protected http: HttpClient) {}

  getClients (): Observable<BookPrice[]> {
    return this.http.get<BookPrice[]>(this.url+'/AllClients')
  }

 Partners(): Observable<Partner[]>{
    return this.http.get<Partner[]>(this.url+'/Partners')
 }
 
  ClientsPerPartner(partner: string): Observable<BookPrice[]>{
    return this.http.get<BookPrice[]>(this.url+`/ClientsPartner/${partner}`)
  }
}
