// import React from "react";
// import { Menu, Bell, Settings, Search, User, Package } from "lucide-react";
// interface NavbarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }


// export function Navbar({
//   sidebarOpen,
//   setSidebarOpen
// }: NavbarProps) {

//   return (
//   <header className="bg-white border-b border-gray-200 shadow-sm">
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center gap-4">
//           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
//             <Menu size={24} className="text-gray-600" />
//           </button>
//           <div className="flex items-center gap-2">
//             <div className="p-1 rounded">
//               <Package size={24} className="text-indigo-600" />
//             </div>
//             <h1 className="text-xl font-semibold text-gray-800">
//               Inventory Computer
//             </h1>
//           </div>
//         </div>
//         {/* <div className="hidden md:flex items-center relative mx-4 flex-1 max-w-md">
//           <Search size={18} className="absolute left-3 text-gray-400" />
//           <input type="text" placeholder="Search inventory..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
//         </div> */}
//         <div className="flex items-center gap-3">
//           <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
//             <Bell size={20} />
//           </button>
//           {/* <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
//             <Settings size={20} />
//           </button> */}
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//               <User size={16} className="text-gray-600" />
//             </div>
//             <span className="hidden md:inline text-sm font-medium text-gray-700">
//               User
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//     );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, Bell, User, Package, X, Trash2 } from "lucide-react";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface Alert {
  _id: string;
  type: string;
  message: string;
  code: string;
  stock: number;
  created_at: string;
}

export function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ดึงข้อมูลแจ้งเตือน
  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:3002/alert/getstock");
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  // ฟังก์ชันลบแจ้งเตือน
  const deleteAlert = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3002/alert/deletealert/${_id}`);
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== _id));
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm relative">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
            <Menu size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded">
              <Package size={24} className="text-indigo-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Inventory Computer</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Notification Bell */}
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Bell size={20} />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {alerts.length}
              </span>
            )}
          </button>

          {/* Dropdown Notification */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-36 mr-14 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
              <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                <button onClick={() => setDropdownOpen(false)}>
                  <X size={16} className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {alerts.length === 0 ? (
                  <p className="text-center text-gray-500 py-3">No new alerts</p>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert._id} className="px-4 py-3 border-b last:border-none flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{alert.message}</span>
                        <span className="text-xs text-gray-500 block">Code: {alert.code} | Stock: {alert.stock}</span>
                      </div>
                      <button
                        onClick={() => deleteAlert(alert._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">User</span>
          </div>
        </div>
      </div>
    </header>
  );
}

