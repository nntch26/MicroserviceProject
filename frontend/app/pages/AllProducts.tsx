"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { ProductTable } from "../components/ProductTable";
import Link from "next/link";
import { Category, Product } from "@/types/types";
import { fetchCategory, filterProduct, searchProduct } from "../api/productServices";

export function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // ดึงข้อมูลหมวดหมู่
  const fetchCategories = async () => {
    try {
      const response = await fetchCategory();
      console.log("Category fetch data:", response);
      setCategories(response);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // ค้นหาสินค้า
  const handleSearch = async () => {
    try {
      console.log("searchTerm:", searchTerm);
      const response = await searchProduct(searchTerm);
      setProducts(response);
      console.log("searchProduct response:", response);

    } catch (error) {
      console.error("Error searching product:", error);
    }
  };

  // filter product ตาม category
  const handleFilter = async () => {
    try {
      console.log("selectedCategory:", selectedCategory);
      const response = await filterProduct(selectedCategory);

      setProducts(response);
      console.log("filterProduct response:", response);

    } catch (error) {
      console.error("Error filtering product:", error);
    }
  }


  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    handleSearch();
    handleFilter()
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        </div>

        <Link href="/addProduct">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 cursor-pointer">
            <Plus size={20} />
            Add Product
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* ช่องค้นหา */}
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
            
            {/* เลือกหมวดหมู่ */}
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all" >All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            
          </div>
        </div>

        {/* ส่ง products ไปแสดงในตาราง */}
        <ProductTable showActions={true} products={products} />
      </div>
    </div>
  );
}
