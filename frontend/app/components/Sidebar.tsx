import React, { useState } from "react";
import { LayoutDashboard, Package, ChevronDown,ClipboardList  } from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  sidebarOpen: boolean;
}

export function Sidebar({ activePage, setActivePage, sidebarOpen }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    products: true,
    inventory: false
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (!sidebarOpen) {
    return (
      <div className="w-16 bg-gray-800 text-gray-400 flex flex-col items-center py-4 overflow-y-auto">
        <div className="flex flex-col items-center gap-6 mt-2">
          <button className={`p-2 rounded-lg ${activePage === "dashboard" ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("dashboard")}>
            <LayoutDashboard size={20} />
          </button>
          <button className={`p-2 rounded-lg ${activePage === "products" ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("products")}>
            <Package size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 bg-gray-800 text-gray-300 overflow-y-auto">
      <div className="px-4 py-6">
        <nav className="space-y-1">
          <button className={`flex items-center px-4 py-3 rounded-md w-full ${activePage === "dashboard" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("dashboard")}> 
            <LayoutDashboard size={20} className="mr-3" />
            <span>Dashboard</span>
          </button>

          {/* Products Category */}
          <div>
            <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700 rounded-md" onClick={() => toggleCategory("products")}> 
              <div className="flex items-center">
                <Package size={20} className="mr-3" />
                <span>Products</span>
              </div>
              <ChevronDown size={16} className={`transform transition-transform ${expandedCategories.products ? "rotate-180" : ""}`} />
            </button>
            {expandedCategories.products && (
              <div className="ml-8 mt-1 space-y-1">
                <button className={`flex items-center px-4 py-2 rounded-md w-full ${activePage === "all-products" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("all-products")}>All Products</button>
                <button className={`flex items-center px-4 py-2 rounded-md w-full ${activePage === "categories" ? "bg-gray-700 text-white " : "hover:bg-gray-700"}`} onClick={() => setActivePage("categories")}>Categories</button>
              </div>
            )}
          </div>

          {/* Inventory Category */}
          <div>
            <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700 rounded-md" onClick={() => toggleCategory("inventory")}> 
              <div className="flex items-center">
                <ClipboardList  size={20} className="mr-3" />
                <span>Inventory</span>
              </div>
              <ChevronDown size={16} className={`transform transition-transform ${expandedCategories.inventory ? "rotate-180" : ""}`} />
            </button>
            {expandedCategories.inventory && (
              <div className="ml-8 mt-1 space-y-1">
                <button className={`flex items-center px-4 py-2 rounded-md w-full ${activePage === "Inventory" ? "bg-gray-700 text-white " : "hover:bg-gray-700"}`} onClick={() => setActivePage("inventory")}>Inventory List</button>
                <button className={`flex items-center px-4 py-2 rounded-md w-full ${activePage === "low-stock" ? "bg-gray-700 text-white " : "hover:bg-gray-700"}`} onClick={() => setActivePage("low-stock")}>Low Stock</button>
                <button className={`flex items-center px-4 py-2 rounded-md w-full ${activePage === "out-of-stock" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("out-of-stock")}>Out of Stock</button>
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-gray-700">
            <button className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-700`}>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
