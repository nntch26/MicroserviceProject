
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