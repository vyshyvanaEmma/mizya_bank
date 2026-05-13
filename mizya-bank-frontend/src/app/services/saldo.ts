import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  private apiUrl = '/accounts';

  constructor(private http: HttpClient) {}

  getBalance(idAccount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idAccount}/balance`);
  }

  getTransactions(idAccount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idAccount}/transactions`);
  }

  getConvertedFiat(idAccount: number, toCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idAccount}/balance/convert/fiat`, {params: { to: toCurrency }})
  }

  getConvertedCrypto(idAccount: number, toCrypto: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idAccount}/balance/convert/crypto`, {params: { to: toCrypto }})
  }
}
