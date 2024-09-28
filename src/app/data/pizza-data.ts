export interface PizzaSize {
  name: string;
  price: number;
}

export interface Topping {
  name: string;
  price: number;
  isNonVeg?: boolean;
}

export interface Offer {
  name: string;
  description: string;
  apply: (selectedSize: PizzaSize | null, selectedToppings: Topping[], selectedQuantity: number) => { size: PizzaSize | null, totalPrice: number };
}

// Static pizza size data
export const PIZZA_SIZES: PizzaSize[] = [
  { name: 'Small', price: 5 },
  { name: 'Medium', price: 7 },
  { name: 'Large', price: 8 },
  { name: 'Extra Large', price: 9 }
];

// Static toppings data
export const VEG_TOPPINGS: Topping[] = [
  { name: 'Tomatoes', price: 1.0 },
  { name: 'Onions', price: 0.5 },
  { name: 'Bell Pepper', price: 1.0 },
  { name: 'Mushrooms', price: 1.2 },
  { name: 'Pineapple', price: 0.75 }
];

export const NON_VEG_TOPPINGS: Topping[] = [
  { name: 'Sausage', price: 1.0 },
  { name: 'Pepperoni', price: 2.0 },
  { name: 'Barbecue Chicken', price: 3.0 }
];
 
export const PROMOTIONAL_OFFERS: Offer[] = [
  {
    name: 'Offer 1',
    description: '1 Medium Pizza with 2 toppings for $5',
    apply: (size, toppings, quantity) => {
      if (size && size.name === 'Medium' && toppings.length === 2 && quantity === 1) {
        return { size, totalPrice: 5 };
      }
      return { size, totalPrice: size ? size.price * quantity + toppings.reduce((sum, t) => sum + t.price, 0) : 0 };
    }
  },
  {
    name: 'Offer 2',
    description: '2 Medium Pizzas with 4 toppings each for $9',
    apply: (size, toppings, quantity) => {
      if (size && size.name === 'Medium' && toppings.length === 4 && quantity === 2) {
        return { size, totalPrice: 9 };
      }
      return { size, totalPrice: size ? size.price * quantity + toppings.reduce((sum, t) => sum + t.price, 0) : 0 };
    }
  },
  {
    name: 'Offer 3',
    description: '1 Large Pizza with 4 toppings (Pepperoni and BBQ Chicken count as 2 toppings each) - 50% off',
    apply: (size, toppings, quantity) => {
      if (size && size.name === 'Large' && quantity === 1) {
        let toppingCount = 0;

        toppings.forEach(topping => {
          if (topping.name.toLowerCase() === 'pepperoni' || topping.name.toLowerCase() === 'barbecue chicken') {
            toppingCount += 2;   
          } else {
            toppingCount += 1;  
          }
        });

        if (toppingCount === 4) {
          const totalPrice = (size.price + toppings.reduce((sum, t) => sum + t.price, 0)) * 0.5;
          return { size, totalPrice };
        }
      }

      return { size, totalPrice: size ? size.price * quantity + toppings.reduce((sum, t) => sum + t.price, 0) : 0 };
    }
  }
];
