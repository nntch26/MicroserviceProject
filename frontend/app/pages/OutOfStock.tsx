import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import Link from 'next/link';
import { Category } from "@/types/types";
import { OutOfStockTable } from "../components/OutOfStockTable";
import { fetchCategory } from "../api/productServices";

export function OutOfStock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategory();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Out Of Stock List</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory out of stock</p>
        </div>
      </div>

      {/* ค้นหาและเลือกหมวดหมู่ */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <OutOfStockTable limit={null} searchTerm={searchTerm} selectedCategory={selectedCategory} showActions={true}/>
      </div>
    </div>
  );
}
