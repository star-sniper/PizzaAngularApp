import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PIZZA_SIZES, VEG_TOPPINGS, NON_VEG_TOPPINGS, PROMOTIONAL_OFFERS, PizzaSize, Topping, Offer } from '../data/pizza-data';

@Component({
  selector: 'app-order-entry',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css']
})
export class OrderEntryComponent {

  sizes: PizzaSize[] = PIZZA_SIZES;
  vegToppings: Topping[] = VEG_TOPPINGS;
  nonVegToppings: Topping[] = NON_VEG_TOPPINGS;
  offers: Offer[] = PROMOTIONAL_OFFERS;  

  selectedSize: PizzaSize | null = null;
  selectedToppings: Topping[] = [];
  selectedQuantity: number = 1;
  originalPrice: number = 0;   
  totalPrice: number = 0;
  showOffer: boolean = false;
  selectedOffer: Offer | null = null;
  appliedOfferName: string | null = null;  

  // Reset all selections
  resetOrder() {
    this.selectedSize = null;
    this.selectedToppings = [];
    this.totalPrice = 0;
    this.originalPrice = 0;
    this.selectedOffer = null;
    this.appliedOfferName = null;
    this.selectedQuantity = 1;
    const radioButtons = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    radioButtons.forEach(button => button.checked = false);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(checkbox => checkbox.checked = false);
  }

  toggleTopping(topping: Topping) {
    const index = this.selectedToppings.indexOf(topping);
    if (index >= 0) {
      this.selectedToppings.splice(index, 1);
    } else {
      this.selectedToppings.push(topping);
    }
    this.calculatePrice();
  }

  calculatePrice() {
    if (!this.selectedSize || this.selectedQuantity < 1) {
      this.totalPrice = 0;
      this.originalPrice = 0;
      this.appliedOfferName = null;  
      return;
    }

    this.originalPrice = this.selectedSize.price * this.selectedQuantity + this.calculateToppingPrice(this.selectedToppings);

    let discountedPrice = 0;  // Reset discounted price
    this.appliedOfferName = null;  // Reset offer name initially

    for (let i = 0; i < this.selectedQuantity; i++) {
      let singlePizzaPrice = this.selectedSize.price;

      // Medium Pizza Offers
      if (this.selectedSize.name.toLowerCase() === 'medium') {
        if (this.selectedToppings.length === 2) {
          // Offer 1: $5 per medium pizza with 2 toppings
          singlePizzaPrice = 5;
          this.appliedOfferName = 'Medium Pizza with 2 toppings for $5';  
        } else if (this.selectedQuantity === 2 && this.selectedToppings.length === 4) {
          // Offer 2: $9 for 2 medium pizzas with 4 toppings each
          discountedPrice = 9;   
          this.appliedOfferName = '2 Medium Pizzas with 4 toppings each for $9';  
          break;   
        } else {
          singlePizzaPrice = this.selectedSize.price + this.calculateToppingPrice(this.selectedToppings);
          this.appliedOfferName = 'None';  
        }
      } 

      // Large Pizza Offers
      else if (this.selectedSize.name.toLowerCase() === 'large') {
        // Offer 3: 50% off for a large pizza with exactly 4 valid toppings
        const toppingCount = this.countValidToppings();
        if (toppingCount === 4) {
          singlePizzaPrice = (this.selectedSize.price + this.calculateToppingPrice(this.selectedToppings)) * 0.5;
          this.appliedOfferName = '1 Large Pizza with 4 toppings (Pepperoni and BBQ Chicken count as 2) - 50% off';  
        } else {
          singlePizzaPrice = this.selectedSize.price + this.calculateToppingPrice(this.selectedToppings);  
          this.appliedOfferName = 'None';  
        }
      }

      discountedPrice += singlePizzaPrice;
    }

    this.totalPrice = discountedPrice;
  }

  calculateToppingPrice(toppings: Topping[]): number {
    return toppings.reduce((sum, topping) => sum + topping.price, 0);
  }

  countValidToppings(): number {
    let toppingCount = 0;

    this.selectedToppings.forEach(topping => {
      const toppingName = topping.name.toLowerCase();   

      if (toppingName === 'pepperoni' || toppingName === 'barbecue chicken') {
        toppingCount += 2;  
      } else {
        toppingCount += 1;  
      }
    });

    return toppingCount;
  }

  applyOffer(offer: Offer) {
    this.selectedOffer = offer;
    this.calculatePrice();
  }

  getToppingNames(): string {
    return this.selectedToppings.length > 0
      ? this.selectedToppings.map(t => t.name).join(', ')
      : 'None';
  }
}
