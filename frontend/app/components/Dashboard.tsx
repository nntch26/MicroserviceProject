import React, { useState } from "react";
import { ProductSummary } from "./ProductSummary";
import { ProductTable } from "./ProductTable";

export function Dashboard() {
  const [limit, setLimit] = useState(5); // เริ่มต้นที่ 5
  const [isAllProducts, setIsAllProducts] = useState(false); // state เพื่อตรวจสอบว่าแสดงทั้งหมดหรือไม่

  // ฟังก์ชันที่ใช้เมื่อคลิกปุ่ม "View All"
  function toggleView() {
    if (isAllProducts) {
      setLimit(5); // กลับมาแสดง 5 รายการ
    } else {
      setLimit(0); // แสดงทั้งหมด
    }
    setIsAllProducts(!isAllProducts); // สลับสถานะ
  }

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
              onClick={toggleView}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isAllProducts ? "View Limited Products" : "View All Products"}
            </button>
          </div>
          <ProductTable limit={limit} /> {/* ส่ง limit ไปยัง ProductTable */}
        </div>
      </div>
    </div>
  );
}
