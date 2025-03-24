import React, { useEffect, useState } from "react";
import { Package, Pencil, Trash2 } from "lucide-react";
import { InventoryProducts, ProductTableProps } from "@/types/types";
import { fetchInventoryProduct } from "../api/InventoryServices";
import axios from "axios";

export function InventoryTable({
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
        setInventory(resInventory);
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

    
  // ฟังก์ชันเพื่อกำหนดสีพื้นหลังของ status
  const getStatusClass = (status: string, quantityInStock: number) => {
    // เช็คว่า instock และจำนวนต่ำกว่า 10 ให้เป็น low_stock
    if (status === 'in_stock' && quantityInStock < 10 && quantityInStock !== 0) {
      status = 'low_stock'; // เปลี่ยนเป็น low_stock
    }

    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800'; // สีเขียว
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800'; // สีเหลือง
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'; // สีแดง
      default:
        return 'bg-gray-100 text-gray-800'; // สีเทา (กรณีที่ status ไม่ตรงกับค่าเหล่านี้)
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    try {
      await axios.delete(`http://localhost:8080/apiInventory/inventory/${id}`);
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
                No products found
              </td>
            </tr>
          ) : (
            filteredInventory.map((item) => {
              const product = item.product?.product;
              const statusClass = getStatusClass(item.status, item.quantity_in_stock); // ใช้ quantity_in_stock เพื่อตรวจสอบ low_stock
              const displayStatus = item.status === 'in_stock' && item.quantity_in_stock < 10 && item.quantity_in_stock !== 0
                ? 'low_stock'  // เปลี่ยนคำว่า 'in_stock' เป็น 'low_stock' เมื่อจำนวนต่ำกว่า 10
                : item.status;

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
                  <td className={`px-6 py-4 whitespace-nowrap text-center ${statusClass}`}>
                    {displayStatus}
                  </td>
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
