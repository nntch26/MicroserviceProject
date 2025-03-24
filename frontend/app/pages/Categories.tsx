import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { CategoryTable } from "../components/CategoryTable";

export function Categories() {

  // const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories</p>
        </div>
        {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
          <Plus size={20} />
          Add Category
        </button> */}
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            
          </div>
        </div>
        <CategoryTable />
      </div>
    </div>
  );
}
