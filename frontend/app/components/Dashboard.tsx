import React from "react";
import { ProductSummary } from "./ProductSummary";
import { ProductTable } from "./ProductTable";
export function Dashboard() {
return (
    <div className="space-y-6">
    <div>
        <h1 className="text-2xl font-bold text-gray-800">
        Inventory Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
        Overview of your product inventory status
        </p>
    </div>
    <ProductSummary />
    <div>
        <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
            Product Inventory
            </h2>
            <button
            onClick={() => setActivePage("all-products")}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
            View All Products
            </button>
        </div>
        <ProductTable limit={5} />
        </div>
    </div>
    </div>
);
}
