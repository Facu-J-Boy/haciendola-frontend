export interface Product {
  id: string;
  handle?: string;
  title: string;
  description: string;
  SKU?: number;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barCode?: number;
}
