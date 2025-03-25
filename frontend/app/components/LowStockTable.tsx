import React, { useEffect, useState } from "react";
import { Package, Pencil, Trash2 } from "lucide-react";
import { InventoryProducts, ProductTableProps } from "@/types/types";
import { fetchInventoryProduct, deleteInventoryProduct } from "../api/InventoryServices";

export function LowStockTable({
  searchTerm,
  selectedCategory,
  showActions = false,
  limit,
}: ProductTableProps) {
  const [inventory, setInventory] = useState<InventoryProducts[]>([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const resInventory = await fetchInventoryProduct();
        const lowStockItems = resInventory.filter((item: InventoryProducts) => item.quantity_in_stock <= 10 && item.quantity_in_stock != 0);
        setInventory(lowStockItems);
      } catch (error) {
        console.error("Error fetching inventory API:", error);
      }
    };
    fetchData();
  }, []);

  const filteredInventory = inventory
    .filter((item) => {
      const product = item.product?.product;
      const searchTermLower = (searchTerm || "").toLowerCase();
      return (
        (product?.name?.toLowerCase().includes(searchTermLower) ||
          product?.code?.toLowerCase().includes(searchTermLower)) && // เพิ่มเงื่อนไขการค้นหาด้วย code
        (selectedCategory ? product?.category?.name === selectedCategory : true)
      );
    })
    .slice(0, limit ?? inventory.length); // ถ้า limit ไม่มีค่า ให้ใช้จำนวนสินค้าทั้งหมด

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    try {
      await deleteInventoryProduct(id);
      setInventory((prevInventory) => prevInventory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            {showActions && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInventory.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 8 : 7} className="px-6 py-4 text-center text-gray-500">
                No low stock products found
              </td>
            </tr>
          ) : (
            filteredInventory.map((item) => {
              const product = item.product?.product;
              
              return (
                <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price?.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity_in_stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-yellow-800 bg-yellow-100 text-center">low_stock</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                        {new Date(item.last_updated).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                    </td>
                    {showActions && (
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                                <Trash2 size={16} />
                            </button>
                        </td>
                    )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
