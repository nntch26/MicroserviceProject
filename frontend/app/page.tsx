'use client';
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { AllProducts } from "./pages/AllProducts";
import { Categories } from "./pages/Categories";
import { Inventory } from "./pages/Inventory";
import { InventoryMovement } from "./pages/InventoryMovement";
import { LowStock } from "./pages/LowStock";
import { OutOfStock } from "./pages/OutOfStock";


export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const renderPage = () => {
    switch (activePage) {
      case "all-products":
        return <AllProducts />;
      case "categories":
        return <Categories/>
      case "inventory":
        return <Inventory/>
      case "low-stock":
        return <LowStock/>
      case "out-of-stock":
        return <OutOfStock/>

      case "inventory-movement":
          return <InventoryMovement/>
      default:
        return <Dashboard />;
    }
  };

  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-auto p-4">{renderPage()}</main>
      </div>
    </div>
  );
}
