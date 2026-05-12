import { Component, OnInit } from '@angular/core';
import { SaldoService } from '../../services/saldo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo.html',
  styleUrl: './saldo.css',
})
export class Saldo implements OnInit {

  idAccount: number = 1; 
  saldoTotal: number = 0;
  lastTransactions: any[] = [];

  saldoFiatUsd: number = 0;
  quantityBitcoin: number = 0;
  taxChangeUsd: number = 0;
  price1Bit: number = 0;

  constructor(private saldoService: SaldoService) {}

  ngOnInit(): void {
    this.loadDates();
  }

  loadDates() {
    // balance call
    this.saldoService.getBalance(this.idAccount).subscribe(data => {
      this.saldoTotal = data.balance;
    });

    // transactions call
    this.saldoService.getTransactions(this.idAccount).subscribe(data => {
      this.lastTransactions = data.slice(0, 2); // last 2 transactions; 
    });

    // convert to USD (fiat)
    this.saldoService.getConvertedFiat(this.idAccount, 'USD').subscribe(data => {
      this.saldoFiatUsd = data.converted_balance;
      this.taxChangeUsd = data.rate;
    });

    // convert to bit (crypto)
    this.saldoService.getConvertedCrypto(this.idAccount, 'BTC').subscribe(data => {
      this.quantityBitcoin = data.converted_amount;
      this.price1Bit = data.price;
    });
  }
}
