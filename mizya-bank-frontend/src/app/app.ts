import { CommonModule } from '@angular/common';
import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router, NavigationEnd } from '@angular/router'; // Inserito l'import di Router e NavigationEnd
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isMenuOpen = false;

  constructor(private router: Router) {
    // automate reload of all the pages
    afterNextRender(() => {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects || event.url;
        const reloadKey = 'reloaded_' + currentRoute;

        if (!sessionStorage.getItem(reloadKey)) {
          sessionStorage.setItem(reloadKey, 'true');
          window.location.reload();
        }
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // background scrolling when the menu is open
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
