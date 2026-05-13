import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaldoService } from '../../services/saldo';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-manager',
  imports: [CommonModule, CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './transaction-manager.html',
  styleUrl: './transaction-manager.css',
})
export class TransactionManager implements OnInit {
  idAccount: number = 1;
  transaction: any = null;
  isLoading: boolean = true;
  isEditing: boolean = false;
  editDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saldoService: SaldoService
  ) { }

  ngOnInit(): void {
    // id from route params
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchDetail(+id);
    }
  }

  // fetch transaction
  fetchDetail(id: number): void {
    this.isLoading = true;
    this.saldoService.getTransactionById(this.idAccount, id).subscribe({
      next: (data) => {
        this.transaction = data;
        this.editDescription = data.description; // sync local edit
        this.isLoading = false;
      }
    });
  }

  // toggle edit mode UI
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) this.editDescription = this.transaction.description; // reset on cancel
  }

  // save updated record
  saveUpdate(): void {
    const payload = { ...this.transaction, description: this.editDescription };

    this.saldoService.updateTransaction(this.idAccount, this.transaction.id, payload).subscribe({
      next: () => {
        this.transaction.description = this.editDescription;
        this.isEditing = false;
      },
      error: (err) => console.error("Update failed", err)
    });
  }

  // remove
  deleteEntry(): void {
    if (confirm('Are you sure you want to permanently delete this record?')) {
      this.saldoService.deleteTransaction(this.idAccount, this.transaction.id).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error("Wipe failed", err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/history']);
  }
}
