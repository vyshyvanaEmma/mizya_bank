import { Component, OnInit } from '@angular/core';
import { SaldoService } from '../../services/saldo';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-convert-crypto',
  imports: [CommonModule, FormsModule, DecimalPipe, CurrencyPipe],
  templateUrl: './convert-crypto.html',
  styleUrl: './convert-crypto.css',
})
export class ConvertCrypto implements OnInit {
  idAccount = 1;
  currentBalance: number = 0;
  rate: number = 0;
  amountToConvert: number = 0;
  convertedValue: number = 0;

  showModal: boolean = false;
  quickAmounts: number[] = [100, 500, 1000, 5000, 10000, 25000];

  constructor(private saldoService: SaldoService) { }

  ngOnInit(): void {
    this.loadCryptoData();
  }

  loadCryptoData() {
    this.saldoService.getConvertedCrypto(this.idAccount, 'BTC').subscribe({
      next: (res) => {
        this.rate = parseFloat(res.price);
        this.currentBalance = parseFloat(res.original_balance);
        this.calculate();
      },
      error: (err) => console.error("Errore:", err)
    });
  }

  selectShortcut(value: number) {
    this.amountToConvert = value;
    this.calculate();
  }

  calculate() {
    if (this.amountToConvert > 0 && this.rate > 0) {
      // EUR / priceBTC
      this.convertedValue = this.amountToConvert / this.rate;
    } else {
      this.convertedValue = 0;
    }
  }

  executeExchange() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
