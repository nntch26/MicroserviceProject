
export interface Category {
    _id: string;
    name: string;
    description: string;
}

export interface Product {
    _id: string;
    code: string;
    name: string;
    category: Category;
    price: number;
    last_updated: string;
    __v: number;
}

// ส่ง api product
export interface ProductData {
    code: string;
    name: string;
    category: string;
    price: number;
}

export interface InventoryProducts {
    _id: string;
  product: Product;
  quantity_in_stock: number;
  status: string;
}
