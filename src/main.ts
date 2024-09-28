import { bootstrapApplication } from '@angular/platform-browser';
import { OrderEntryComponent } from './app/order-entry/order-entry.component';  

bootstrapApplication(OrderEntryComponent)   
  .catch(err => console.error(err));
