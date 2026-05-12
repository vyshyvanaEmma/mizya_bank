import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  private apiUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) {}

  getBalance(idAccount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/${idAccount}/balance`);
  }

  getTransactions(idAccount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts/${idAccount}/transactions`);
  }

  getConvertedFiat(idAccount: number, toCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/${idAccount}/balance/convert/fiat`, {params: { to: toCurrency }})
  }

  getConvertedCrypto(idAccount: number, toCrypto: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/${idAccount}/balance/convert/crypto`, {params: { to: toCrypto }})
  }
}
