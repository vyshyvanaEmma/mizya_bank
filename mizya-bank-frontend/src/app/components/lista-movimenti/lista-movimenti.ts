import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaldoService } from '../../services/saldo';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-lista-movimenti',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './lista-movimenti.html',
  styleUrl: './lista-movimenti.css',
})
export class ListaMovimenti implements OnInit {
  // state management
  idAccount: number = 1;
  allTransactions: any[] = [];
  filteredTransactions: any[] = [];
  activeFilter: string = 'all';

  // inject router in constructor
  constructor(private saldoService: SaldoService, private router: Router) {}

  ngOnInit(): void {
    this.fetchFullHistory();
  }

  // fetch & sanitize transaction data
  fetchFullHistory(): void {
    this.saldoService.getTransactions(this.idAccount).subscribe({
      next: (data) => {
        const sanitizedData = data.map(t => {
          const rawDate = t.created_at || t.date;
          return {
            ...t,
            created_at: (rawDate && rawDate !== '0000-00-00 00:00:00') ? rawDate : new Date().toISOString()
          };
        });

        this.allTransactions = sanitizedData.sort((a, b) => b.id - a.id);
        this.applyFilter('all');
      },
      error: (err) => {
        console.error("Failed to recover user transactions records", err);
      }
    });
  }

  // navigate to detail view by id
  viewDetails(transactionId: number): void {
    this.router.navigate(['/transaction', transactionId]);
  }

  // apply memory filters
  applyFilter(type: string): void {
    this.activeFilter = type;
    if (type === 'all') {
      this.filteredTransactions = [...this.allTransactions];
    } else {
      this.filteredTransactions = this.allTransactions.filter(t => t.type === type);
    }
  }
}
