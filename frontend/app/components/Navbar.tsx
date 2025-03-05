import React from "react";
import { Menu, Bell, Settings, Search, User } from "lucide-react";
interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}


export function Navbar({
  sidebarOpen,
  setSidebarOpen
}: NavbarProps) {

  return (
  <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
            <Menu size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Inventory Pro
            </h1>
          </div>
        </div>
        {/* <div className="hidden md:flex items-center relative mx-4 flex-1 max-w-md">
          <Search size={18} className="absolute left-3 text-gray-400" />
          <input type="text" placeholder="Search inventory..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div> */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">
              User
            </span>
          </div>
        </div>
      </div>
    </header>
    );
}