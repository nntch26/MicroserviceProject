import React from "react";
import { ProductSummary } from "./ProductSummary";
import { RecentActivity } from "./RecentActivity";


export function Dashboard() {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Inventory Status
            </h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200">
              <div className="text-center">
                <p className="text-gray-500">Inventory Status Chart</p>
                <p className="text-sm text-gray-400 mt-1">
                  Distribution by category
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div>
          {/* <RecentActivity /> */}
        </div>
      </div>
    </div>
  );
}