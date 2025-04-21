
export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "kota",
    name: "Kota",
    image: "https://basadiskitchen/app/products/category/kota-category.png",
  },
  {
    id: "burger",
    name: "Burgers",
    image: "https://basadiskitchen/app/products/category/burgers-category.png",
  },
  {
    id: "pizza",
    name: "Pizza",
    image: "https://basadiskitchen/app/products/category/pizza-category.png",
  },
  {
    id: "sandwich",
    name: "Sandwich",
    image: "https://basadiskitchen/app/products/category/sandwich-category.png",
  },
  {
    id: "wings",
    name: "Wings",
    image: "https://basadiskitchen/app/products/category/wings-category.png",
  },
];
