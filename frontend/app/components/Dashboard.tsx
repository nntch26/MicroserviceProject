import React, { useState } from "react";
import { ProductSummary } from "./ProductSummary";
import { InventoryTable } from "./InventoryTable"; // เปลี่ยนจาก ProductTable เป็น InventoryTable

export function Dashboard() {
  const [limit, setLimit] = useState(5); // กำหนดค่าเริ่มต้นที่ 5

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Inventory Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your product inventory status</p>
      </div>
      <ProductSummary />
      <div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Product Inventory</h2>
          </div>
          <InventoryTable limit={limit}  showActions={false} searchTerm={""} selectedCategory={""}/> {/* ใช้ InventoryTable และส่ง limit */}
        </div>
      </div>
    </div>
  );
}
