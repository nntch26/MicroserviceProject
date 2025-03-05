'use client';
import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { Package, AlertCircle, AlertTriangle, Tag } from "lucide-react";

interface Products {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  status: string;
  category: {
    _id: string;
    name: string;
  };
}

interface Category {
  _id: string;
  name: string;
}

export function ProductSummary() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countProducts, setCountProducts] = useState(0);
  const [countCategories, setCountCategories] = useState(0);

  const fetchData = async () => {
    try {
      const resProducts = await axios.get("http://localhost:8080/api/products");
      const resCategories = await axios.get("http://localhost:8080/api/categories");
      setProducts(resProducts.data.data);
      setCategories(resCategories.data.data);
    } catch (error) {
      console.error("Error fetching products API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCountProducts(products.length);
    setCountCategories(categories.length);
  }, [products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* นับจำนวนสินค้าทั้งหมด */}
      <SummaryCard
        title="Total Products"
        value={countProducts.toString()}
        icon={<Package size={24} className="text-blue-600" />}
        change="+12%"
        positive={true}
      />

      {/* สินค้าที่มีสต็อกน้อย (ต่ำกว่า 10) */}
      <SummaryCard
        title="Low Stock Items"
        value={products.filter((p) => p.quantity < 10).length.toString()}
        icon={<AlertTriangle size={24} className="text-amber-500" />}
        change="-5%"
        positive={true}
      />

      {/* สินค้าที่หมดสต็อก (quantity = 0) */}
      <SummaryCard
        title="Out of Stock"
        value={products.filter((p) => p.quantity === 0).length.toString()}
        icon={<AlertCircle size={24} className="text-red-500" />}
        change="+3%"
        positive={false}
      />

      {/* จำนวนหมวดหมู่ของสินค้า (นับจาก category ที่ไม่ซ้ำกัน) */}
      <SummaryCard
        title="Categories"
        value={countCategories.toString()}
        icon={<Tag size={24} className="text-green-600" />}
        change="0%"
        positive={true}
      />
    </div>
  );
}


interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}


function SummaryCard({
  title,
  value,
  icon,
  change,
  positive
}: SummaryCardProps) {


  return <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div className="p-2 rounded-full bg-gray-50">{icon}</div>
    </div>
    <div className="mt-4 flex items-center">
      <span className={`text-sm font-medium ${positive ? "text-green-600" : "text-red-600"}`}>
        {change}
      </span>
      <span className="text-gray-500 text-sm ml-2">from last month</span>
    </div>
  </div>;
}