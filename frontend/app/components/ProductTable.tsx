import React from "react";
import { Package, Pencil, Trash2, Plus } from "lucide-react";
interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}
interface ProductTableProps {
  limit?: number;
  showActions?: boolean;
}
export function ProductTable({
  limit,
  showActions = false,
}: ProductTableProps) {
  const products: Product[] = [
      {
          id: 1,
          name: "Wireless Headphones",
          sku: "WH123",
          category: "Electronics",
          price: 99.99,
          stock: 45,
          status: "In Stock",
      },
      {
          id: 2,
          name: "USB-C Cable",
          sku: "USBC123",
          category: "Accessories",
          price: 14.99,
          stock: 5,
          status: "Low Stock",
      },
      {
          id: 3,
          name: "Bluetooth Speaker",
          sku: "BS123",
          category: "Electronics",
          price: 79.99,
          stock: 0,
          status: "Out of Stock",
      },
      {
          id: 4,
          name: "Laptop Stand",
          sku: "LS123",
          category: "Accessories",
          price: 29.99,
          stock: 23,
          status: "In Stock",
      },
      {
          id: 5,
          name: "Wireless Mouse",
          sku: "WM123",
          category: "Electronics",
          price: 49.99,
          stock: 8,
          status: "Low Stock",
      }
  
  ];
  const displayedProducts = limit ? products.slice(0, limit) : products;
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500 text-green-800";
      case "Low Stock":
        return "bg-yellow-400 text-yellow-800";
      case "Out of Stock":
        return "bg-red-400 text-red-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SKU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
            >
              Status
            </th>
            {showActions && (
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.sku}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  ${product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.stock}</div>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-center font-semibold ${getStatusStyle(product.status)}`}>
                {product.status}
                </td>
              {showActions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Pencil size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
