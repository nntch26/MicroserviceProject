import React from "react";
import { Package, AlertCircle, AlertTriangle, Tag } from "lucide-react";


export function ProductSummary() {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard title="Total Products" value="1,284" icon={<Package size={24} className="text-blue-600" />} change="+12%" positive={true} />
      <SummaryCard title="Low Stock Items" value="28" icon={<AlertTriangle size={24} className="text-amber-500" />} change="-5%" positive={true} />
      <SummaryCard title="Out of Stock" value="15" icon={<AlertCircle size={24} className="text-red-500" />} change="+3%" positive={false} />
      <SummaryCard title="Categories" value="32" icon={<Tag size={24} className="text-green-600" />} change="0%" positive={true} />
    </div>;
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