import { Component, OnInit } from '@angular/core';
import { SaldoService } from '../../services/saldo';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-convert-val',
  imports: [CommonModule, FormsModule, DecimalPipe, CurrencyPipe],
  templateUrl: './convert-val.html',
  styleUrl: './convert-val.css',
})
export class ConvertVal {
  idAccount = 1;
  currentBalance: number = 0;
  rate: number = 0;
  amountToConvert: number = 0;
  convertedValue: number = 0;

  // shortcuts
  quickAmounts: number[] = [20, 50, 100, 200, 500, 1000];

  showModal: boolean = false // pop-up simulation control

  constructor(private saldoService: SaldoService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.saldoService.getConvertedFiat(this.idAccount, 'USD').subscribe({
      next: (res) => {
        this.rate = res.rate;
        this.currentBalance = parseFloat(res.original_balance);
        this.calculate();
      },
      error: (err) => console.error("Errore recupero tassi:", err)
    });
  }

  selectShortcut(value: number) {
    this.amountToConvert = value;
    this.calculate();
  }

  calculate() {
    if (this.amountToConvert > 0) {
      this.convertedValue = this.amountToConvert * this.rate;
    } else {
      this.convertedValue = 0;
    }
  }

  executeExchange() {
   // modal simulation
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.amountToConvert = 0;
    this.calculate();
  }
}


