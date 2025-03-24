"use client";

import { Package } from "lucide-react";
import { useState } from "react";

type InventoryMovement = {
  id: number;
  product_name: string;
  movement_type: "เพิ่ม" | "ลด";
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reason: string;
  date: string;
  user: string;
};

const movements: InventoryMovement[] = [
  { id: 1, product_name: "Laptop", movement_type: "ลด", quantity: 5, previous_stock: 20, new_stock: 15, reason: "ขายสินค้า", date: "2025-03-24", user: "Admin" },
  { id: 2, product_name: "Mouse", movement_type: "เพิ่ม", quantity: 10, previous_stock: 30, new_stock: 40, reason: "เติมสินค้า", date: "2025-03-24", user: "Admin" },
];

export function MovementTable() {

    
  return (
    <>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movement Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Performed By</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Performed By</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance After</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          

        <tr  className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-4">
                <div className="text-sm font-medium text-gray-900"></div>
                </div>
            </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap"></td>
            <td className="px-6 py-4 whitespace-nowrap"></td>
            <td className="px-6 py-4 whitespace-nowrap"></td>
            <td className="px-6 py-4 whitespace-nowrap"></td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
            </td>
        
        </tr>
      
        </tbody>
      </table>
    </div>
  

    </>
  );
}
