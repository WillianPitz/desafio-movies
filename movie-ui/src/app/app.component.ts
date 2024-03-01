import { Component } from '@angular/core';
import { SidenavAutosize } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavAutosize],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
