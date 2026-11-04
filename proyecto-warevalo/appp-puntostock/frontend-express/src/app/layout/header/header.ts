import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  host: {
    class: 'block',
  },
  imports: [ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly appName = input('PuntoStock Express');
  readonly menuRequested = output<void>();
  readonly logoutRequested = output<void>();
}
