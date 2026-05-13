import { Component, OnInit } from '@angular/core';
import { Movements } from '../../services/movements';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-prelievo',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './prelievo.html',
  styleUrl: './prelievo.css',
})
export class Prelievo implements OnInit {
    accountId: number = 1;
  totalBalance: number = 0;

  // Predefined quick amounts for user convenience
  quickAmounts: number[] = [20, 50, 100, 200, 500, 1000];

  selectedAmount: number = 0;
  description: string = '';

  successMessage: string | null = null;

  // States handling the visual UI animations
  isFlying: boolean = false;
  animatedAmount: number = 0;

  constructor(private movementsService: Movements) { }

  ngOnInit(): void {
    this.fetchCurrentBalance();
  }

  selectShortcut(value: number): void {
    // Prevent selecting shortcuts higher than the available balance
    if (value <= this.totalBalance) {
      this.selectedAmount = value;
    }
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

    if (importo <= 0 || importo > this.totalBalance) {
      return;
    }

    // 1. TRIGGER ANIMATION BOX AND BUTTON LOADING STATUS IMMEDIATELY
    this.animatedAmount = importo;
    this.isFlying = true;
    this.successMessage = null;

    const currentDescription = this.description;

    // Reset input fields right away for immediate UX feedback
    this.selectedAmount = 0;
    this.description = '';

    // 2. DISPATCH PAYLOAD IN BACKGROUND TO PHP BACKEND WITHDRAW METHOD
    this.movementsService.withdraw(this.accountId, importo, currentDescription)
      .subscribe({
        next: (response: any) => {
          this.successMessage = "Success! Withdrawal completed.";

          // 3. RELOAD WINDOW AFTER 3 SECONDS TO RE-FETCH BALANCE AND RESET STATE
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        error: (err) => {
          console.error("An error occurred during backend insertion", err);
          this.successMessage = "Error: Unable to complete withdrawal on the server.";

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
  }
}
