import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movements } from '../../services/movements';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito implements OnInit {
  accountId: number = 1;
  totalBalance: number = 0;

  // Predefined quick amounts for user convenience
  quickAmounts: number[] = [20, 50, 100, 200, 500, 1000];

  selectedAmount: number = 0;
  description: string = '';

  successMessage: string | null = null;

  // for animation
  isFlying: boolean = false;
  animatedAmount: number = 0;

  constructor(private movementsService: Movements) { }

  ngOnInit(): void {
    this.fetchCurrentBalance();
  }

  selectShortcut(value: number): void {
    this.selectedAmount = value;
  }

  fetchCurrentBalance(): void {
    this.movementsService.getBalance(this.accountId).subscribe({
      next: (data) => {
        this.totalBalance = data.balance;
      },
      error: (err) => {
        console.error("Failed to recover user asset metrics", err);
      }
    });
  }

  submitRequest(): void {
    const importo = Number(this.selectedAmount);

    if (importo <= 0) {
      return;
    }

    // activate box animation
    this.animatedAmount = importo;
    this.isFlying = true;
    this.successMessage = null;

    const currentDescription = this.description;

    this.selectedAmount = 0;
    this.description = '';

    // send data to server
    this.movementsService.deposit(this.accountId, importo, currentDescription)
      .subscribe({
        next: (response: any) => {
          this.successMessage = "Success! Deposit completed.";

          // reload page after 3 sec
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (err) => {
          console.error("An error occurred during backend insertion", err);
          this.successMessage = "Error: Unable to complete deposit on the server.";

          // unlock button
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  }
}

