import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderEntryComponent } from './order-entry/order-entry.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderEntryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizza-ordering-app';
}
