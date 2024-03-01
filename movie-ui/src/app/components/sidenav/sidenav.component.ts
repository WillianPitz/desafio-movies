import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'sidebar-component',
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.css',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class SidenavAutosize {
  showFiller = false;
  dashboard = '/dashboard'
  list = '/list'
}

