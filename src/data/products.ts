
import { generateId } from "@/lib/utils";

export interface Product {
  id: string;
  product: string;
  ingredients: string[];
  price: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: generateId(),
    product: "Jumbo 30",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty"],
    price: 38.5,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Jumbo 31",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese"],
    price: 44,
    category: "Kota",
    image: "https://basadiskitchen/app/products/product.jpg"
  },
  {
    id: generateId(),
    product: "Jumbo 32",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "egg"],
    price: 49.5,
    category: "Kota",
    image: "https://basadiskitchen/app/products/jumbo32.png"
  },
  {
    id: generateId(),
    product: "Jumbo 33",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "vienna"],
    price: 51.7,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Jumbo 34",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "egg", "bacon"],
    price: 62.7,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Jumbo 35",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "beef patty"],
    price: 55,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Jumbo 36",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "egg", "vienna"],
    price: 57.2,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Jumbo 37",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "egg", "bacon", "vienna"],
    price: 70.4,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Jumbo 38",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "egg", "bacon", "russian"],
    price: 79.2,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Jumbo 39",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "beef patty", "bacon", "egg", "russian"],
    price: 90.2,
    category: "Kota",
    image: "https://basadiskitchen/app/products/jumbo39.png"
  },
  {
    id: generateId(),
    product: "Jumbo 40",
    ingredients: ["Toasted bread", "archaar", "fries", "rib patty", "cheese", "beef patty", "bacon", "egg", "vienna", "russian"],
    price: 97.9,
    category: "Kota",
    image: "https://basadiskitchen/app/products/jumbo40.png"
  },
  {
    id: generateId(),
    product: "Mega 20",
    ingredients: ["Toasted bread", "archaar", "fries", "beef patty", "cheese"],
    price: 27.5,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Mega 21",
    ingredients: ["Toasted bread", "archaar", "fries", "beef patty", "cheese", "egg"],
    price: 33,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Mega 22",
    ingredients: ["Toasted bread", "archaar", "fries", "beef patty", "cheese", "egg", "vienna"],
    price: 40.7,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Mega 23",
    ingredients: ["Toasted bread", "archaar", "fries", "beef patty", "cheese", "egg", "bacon"],
    price: 46.2,
    category: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png"
  },
  {
    id: generateId(),
    product: "Mega 24",
    ingredients: ["Toasted bread", "archaar", "fries", "beef patty", "cheese", "egg", "russian"],
    price: 49.5,
    category: "Kota",
    image: "https://basadiskitchen/app/products/mega24.png"
  },
  {
    id: generateId(),
    product: "Pepperoni/Mushroom",
    ingredients: ["Pepperoni", "Mushroom"],
    price: 66,
    category: "Pizza",
    image: "https://basadiskitchen/app/products/peperoni-mustroom.png"
  },
  {
    id: generateId(),
    product: "Chicken & Mushroom",
    ingredients: ["Chicken", "Mushroom"],
    price: 66,
    category: "Pizza",
    image: "https://basadiskitchen/app/products/chicken-mushroom.png"
  },
  {
    id: generateId(),
    product: "Tomato & Cheese",
    ingredients: ["Tomato", "cheese", "bread"],
    price: 11,
    category: "Sandwich",
    image: "https://basadiskitchen/app/products/tomato-sandwich.png"
  },
  {
    id: generateId(),
    product: "Bacon & Egg with Cheese",
    ingredients: ["Bacon", "egg", "cheese", "bread"],
    price: 35.2,
    category: "Sandwich",
    image: "https://basadiskitchen/app/products/bacon-sandwich.png"
  },
  {
    id: generateId(),
    product: "Cheese & Burger Patty",
    ingredients: ["Burger patty", "cheese", "bread"],
    price: 40.7,
    category: "Sandwich",
    image: "https://basadiskitchen/app/products/burger-sandwich.png"
  },
  {
    id: generateId(),
    product: "Club Sandwich",
    ingredients: ["Club Sandwich"],
    price: 44,
    category: "Sandwich",
    image: "https://basadiskitchen/app/products/club-sandwich.png"
  },
  {
    id: generateId(),
    product: "Tower Sandwich",
    ingredients: ["Tower Sandwich"],
    price: 55,
    category: "Sandwich",
    image: "https://basadiskitchen/app/products/tower-sandwich.png"
  },
  {
    id: generateId(),
    product: "Wings with Chips & Salad",
    ingredients: ["Wings", "chips", "salad"],
    price: 77,
    category: "Wings",
    image: "https://basadiskitchen/app/products/wings.png"
  },
  {
    id: generateId(),
    product: "Wings with Chips, Salad & Drink",
    ingredients: ["Wings", "chips", "salad", "coke"],
    price: 91.3,
    category: "Wings",
    image: "https://basadiskitchen/app/products/wings-coke.png"
  },
  {
    id: generateId(),
    product: "Dozen Wings with Chips & Salad",
    ingredients: ["12 wings", "chips", "salad"],
    price: 126.5,
    category: "Wings",
    image: "https://basadiskitchen/app/products/dozen-wings.png"
  },
  {
    id: generateId(),
    product: "Cheese Burger 1",
    ingredients: ["Double cheese burger"],
    price: 44,
    category: "Burger",
    image: "https://basadiskitchen/app/products/burger.png"
  },
  {
    id: generateId(),
    product: "Cheese Burger 2",
    ingredients: ["Double cheese burger and fries"],
    price: 49.5,
    category: "Burger",
    image: "https://basadiskitchen/app/products/burger.png"
  },
  {
    id: generateId(),
    product: "Cheese Burger 3",
    ingredients: ["Triple cheese burger"],
    price: 51.7,
    category: "Burger",
    image: "https://basadiskitchen/app/products/burger.png"
  },
  {
    id: generateId(),
    product: "Beef Burger 20",
    ingredients: ["Cheese, beef patty"],
    price: 90.2,
    category: "Burger",
    image: "https://basadiskitchen/app/products/burger20.png"
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedProducts = (limit = 6) => {
  // Simple implementation - returns random products
  return [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

export const getPopularProducts = (limit = 6) => {
  // Simple implementation - returns first few products
  return products.slice(0, limit);
};
