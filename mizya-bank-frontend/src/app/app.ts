import { CommonModule } from '@angular/common';
import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isMenuOpen = false;

  constructor() {
    afterNextRender(() => {
      setInterval(() => {
        const players = document.querySelectorAll('.gd-player');
        players.forEach(player => {
          const rect = player.getBoundingClientRect();
          if (rect.left > -20 && rect.left < window.innerWidth) {
            const x = rect.left + (rect.width / 2);
            const y = rect.top + rect.height;
            this.createCoblestone(x, y);
          }
        });
      }, 40);

    });
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }

  createCoblestone(x: number, y: number) {
    const p = document.createElement('div');
    p.className = 'particle-neon'; 
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 500);
  }
}
