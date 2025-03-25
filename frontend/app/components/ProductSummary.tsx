'use client';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Package, AlertCircle, AlertTriangle, Tag } from "lucide-react";
import { InventoryProducts, Category, Product } from "@/types/types";
import { fetchInventoryProduct, fetchCategories } from "../api/InventoryServices";
import { fetchAllProduct } from "../api/productServices";


export function ProductSummary() {
  const [stocks, setStocks] = useState<InventoryProducts[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countProducts, setCountProducts] = useState(0);
  const [countCategories, setCountCategories] = useState(0);

  const fetchData = async () => {
    const stockData = await fetchInventoryProduct();
    setStocks(stockData);

    const categoryData = await fetchCategories();
    setCategories(categoryData);
    
    const productData = await fetchAllProduct();
    setProducts(productData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCountProducts(products.length);
  }, [products]);

  useEffect(() => {
    setCountCategories(categories.length);
  }, [categories]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Products"
        value={countProducts.toString()}
        icon={<Package size={24} className="text-blue-600" />}
      />

      <SummaryCard
        title="Low Stock Items"
        value={stocks.filter((p) => p.quantity_in_stock < 10 && p.quantity_in_stock != 0).length.toString()}
        icon={<AlertTriangle size={24} className="text-amber-500" />}
      />

      <SummaryCard
        title="Out of Stock"
        value={stocks.filter((p) => p.quantity_in_stock === 0).length.toString()}
        icon={<AlertCircle size={24} className="text-red-500" />}
      />

      <SummaryCard
        title="Total Categories"
        value={countCategories.toString()}
        icon={<Tag size={24} className="text-green-600" />}
      />
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function SummaryCard({
  title,
  value,
  icon,
}: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
    </div>
  );
}
