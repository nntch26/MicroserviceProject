
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
    product: {
        product: Product;
    };
    quantity_in_stock: number;
    status: string;
    last_updated: string;
}

export interface ProductTableProps {
    searchTerm: string;
    selectedCategory: string;
    showActions?: boolean;
    limit: number | null;
}

export interface ProductInventoryData {
    productId: string;
    quantity: number;
}

// inventory movement
export interface InventoryMovement{
    _id: string; 
    inventory: InventoryProducts
    movement_type: string;
    quantity: number;  
    reason: string; 
    notes: string;
    performedBy: string;  
    balanceAfter: number;
    updated_at: string;  
}

// ส่ง api InventoryMovement
export interface MovementData {
    inventory: string;         
    movement_type: string; 
    quantity: number;          
    reason: string;         
    notes: string;             
    performedBy: string;       
  }
  