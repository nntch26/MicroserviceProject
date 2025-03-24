"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Inventory Movements</h2>
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Product Name</th>
                        <th className="border border-gray-300 p-2">SKU</th>
                        <th className="border border-gray-300 p-2">Movement Type</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Reason</th>
                        <th className="border border-gray-300 p-2">Notes</th>
                        <th className="border border-gray-300 p-2">Performed By</th>
                        <th className="border border-gray-300 p-2">Timestamp</th>
                        <th className="border border-gray-300 p-2">Balance After</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        <td className="border border-gray-300 p-2">Product A</td>
                        <td className="border border-gray-300 p-2">SKU1234</td>
                        <td className="border border-gray-300 p-2 text-green-600 font-bold">IN</td>
                        <td className="border border-gray-300 p-2">50</td>
                        <td className="border border-gray-300 p-2">Purchase</td>
                        <td className="border border-gray-300 p-2">Supplier Delivery</td>
                        <td className="border border-gray-300 p-2">Admin</td>
                        <td className="border border-gray-300 p-2">2024-03-24 10:00</td>
                        <td className="border border-gray-300 p-2">150</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2">Product B</td>
                        <td className="border border-gray-300 p-2">SKU5678</td>
                        <td className="border border-gray-300 p-2 text-red-600 font-bold">OUT</td>
                        <td className="border border-gray-300 p-2">20</td>
                        <td className="border border-gray-300 p-2">Sale</td>
                        <td className="border border-gray-300 p-2">Online Order</td>
                        <td className="border border-gray-300 p-2">Sales Team</td>
                        <td className="border border-gray-300 p-2">2024-03-24 11:00</td>
                        <td className="border border-gray-300 p-2">80</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    </>
  );
}
