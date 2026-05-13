import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Movements {
  private apiUrl = '/accounts';

  constructor(private http: HttpClient) { }

  getBalance(idAccount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idAccount}/balance`);
  }

  deposit(idAccount: number, amount: number, description: string): Observable<any> {
    const payload = {
      amount: amount,
      description: description ? description : `Deposit of €${amount}`
    };
    return this.http.post(`${this.apiUrl}/${idAccount}/deposits`, payload);
  }

  withdraw(idAccount: number, amount: number, description: string): Observable<any> {
    const payload = {
      amount: amount,
      description: description ? description : `Withdrawal of €${amount}`
    };
    return this.http.post(`${this.apiUrl}/${idAccount}/withdrawals`, payload);
  }

  // get transaction details
  getTransactionById(idAccount: number, idTransaction: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idAccount}/transactions/${idTransaction}`);
  }

  // update transaction data
  updateTransaction(idAccount: number, idTransaction: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idAccount}/transactions/${idTransaction}`, payload);
  }

  // remove record
  deleteTransaction(idAccount: number, idTransaction: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idAccount}/transactions/${idTransaction}`);
  }
}
