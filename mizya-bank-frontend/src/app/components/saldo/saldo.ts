import { Component, OnInit } from '@angular/core';
import { SaldoService } from '../../services/saldo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saldo',
  imports: [CommonModule],
  templateUrl: './saldo.html',
  styleUrl: './saldo.css',
})

export class Saldo implements OnInit {

  idAccount: number = 1; 
  saldoTotal: number = 0;
  lastTransactions: any[] = [];

  constructor(private saldoService: SaldoService) {}

  ngOnInit(): void {
    this.loadDates();
  }

  loadDates() {
    // balance call
    this.saldoService.getBalance(this.idAccount).subscribe(data => {
      this.saldoTotal = data.balance;
    })

    // transactions call
    this.saldoService.getTransactions(this.idAccount).subscribe(data => {
      this.lastTransactions = data.slice(0, 2) // last 2 trsactions; 
    })
  }
}
