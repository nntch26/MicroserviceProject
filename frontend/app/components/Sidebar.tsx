import React, { useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, AlertTriangle, BarChart2, Settings, HelpCircle, ChevronDown, Tag, Users, Truck } from "lucide-react";
interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  sidebarOpen: boolean;
}
export function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    products: true,
    reports: false,
    settings: false
  });
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  if (!sidebarOpen) {
    return <div className="w-16 bg-gray-800 text-gray-400 flex flex-col items-center py-4 overflow-y-auto">
        {/* Collapsed sidebar with only icons */}
        <div className="flex flex-col items-center gap-6 mt-2">
          <button className={`p-2 rounded-lg ${activePage === "dashboard" ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("dashboard")}>
            <LayoutDashboard size={20} />
          </button>
          <button className={`p-2 rounded-lg ${activePage === "products" ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("products")}>
            <Package size={20} />
          </button>
          <button className={`p-2 rounded-lg ${activePage === "orders" ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("orders")}>
            <ShoppingCart size={20} />
          </button>
          <button className={`p-2 rounded-lg ${activePage === "alerts" ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("alerts")}>
            <AlertTriangle size={20} />
          </button>
          <button className={`p-2 rounded-lg ${activePage === "reports" ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("reports")}>
            <BarChart2 size={20} />
          </button>
        </div>
      </div>;
  }
  return <aside className="w-64 bg-gray-800 text-gray-300 overflow-y-auto">
      <div className="px-4 py-6">
        <nav className="space-y-1">
          <a href="#" className={`flex items-center px-4 py-3 rounded-md ${activePage === "dashboard" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("dashboard")}>
            <LayoutDashboard size={20} className="mr-3" />
            <span>Dashboard</span>
          </a>
          {/* Products Category */}
          <div>
            <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700 rounded-md" onClick={() => toggleCategory("products")}>
              <div className="flex items-center">
                <Package size={20} className="mr-3" />
                <span>Products</span>
              </div>
              <ChevronDown size={16} className={`transform transition-transform ${expandedCategories.products ? "rotate-180" : ""}`} />
            </button>
            {expandedCategories.products && <div className="ml-8 mt-1 space-y-1">
                <a href="#" className={`flex items-center px-4 py-2 rounded-md ${activePage === "all-products" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("all-products")}>
                  <span>All Products</span>
                </a>
                <a href="#" className={`flex items-center px-4 py-2 rounded-md ${activePage === "categories" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("categories")}>
                  <span>Categories</span>
                </a>
                <a href="#" className={`flex items-center px-4 py-2 rounded-md ${activePage === "low-stock" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("low-stock")}>
                  <span>Low Stock</span>
                </a>
                <a href="#" className={`flex items-center px-4 py-2 rounded-md ${activePage === "out-of-stock" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("out-of-stock")}>
                  <span>Out of Stock</span>
                </a>
              </div>}
          </div>
          <a href="#" className={`flex items-center px-4 py-3 rounded-md ${activePage === "orders" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("orders")}>
            <ShoppingCart size={20} className="mr-3" />
            <span>Orders</span>
          </a>
          <a href="#" className={`flex items-center px-4 py-3 rounded-md ${activePage === "suppliers" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("suppliers")}>
            <Truck size={20} className="mr-3" />
            <span>Suppliers</span>
          </a>
          <a href="#" className={`flex items-center px-4 py-3 rounded-md ${activePage === "customers" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("customers")}>
            <Users size={20} className="mr-3" />
            <span>Customers</span>
          </a>
          {/* Reports Category */}
          <div>
            <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700 rounded-md" onClick={() => toggleCategory("reports")}>
              <div className="flex items-center">
                <BarChart2 size={20} className="mr-3" />
                <span>Reports</span>
              </div>
              <ChevronDown size={16} className={`transform transition-transform ${expandedCategories.reports ? "rotate-180" : ""}`} />
            </button>
            {expandedCategories.reports && <div className="ml-8 mt-1 space-y-1">
                <a href="#" className={`flex items-center px-4 py-2 rounded-md ${activePage === "sales-report" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("sales-report")}>
                  <span>Sales Report</span>
                </a>
                <a href="#" className={`flex items-center px-4 py-2 rounded-md ${activePage === "inventory-report" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("inventory-report")}>
                  <span>Inventory Report</span>
                </a>
              </div>}
          </div>
          <div className="pt-4 mt-4 border-t border-gray-700">
            <a href="#" className={`flex items-center px-4 py-3 rounded-md ${activePage === "settings" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("settings")}>
              <Settings size={20} className="mr-3" />
              <span>Settings</span>
            </a>
            <a href="#" className={`flex items-center px-4 py-3 rounded-md ${activePage === "help" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`} onClick={() => setActivePage("help")}>
              <HelpCircle size={20} className="mr-3" />
              <span>Help & Support</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>;
}