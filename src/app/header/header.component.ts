import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, BrandLogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
