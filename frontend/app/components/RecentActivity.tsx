import React from "react";


export function RecentActivity() {
  const activities = [{
    id: 1,
    action: "Product Added",
    item: "Wireless Headphones",
    user: "John Smith",
    time: "2 hours ago"
  }, {
    id: 2,
    action: "Stock Updated",
    item: "Smartphone Charger",
    user: "Sarah Johnson",
    time: "4 hours ago"
  }, {
    id: 3,
    action: "Low Stock Alert",
    item: "USB-C Cable",
    user: "System",
    time: "5 hours ago"
  }, {
    id: 4,
    action: "Price Changed",
    item: "Bluetooth Speaker",
    user: "Mike Wilson",
    time: "Yesterday"
  }, {
    id: 5,
    action: "Order Fulfilled",
    item: "Laptop Stand",
    user: "Lisa Taylor",
    time: "Yesterday"
  }];
  return <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map(activity => <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className="flex justify-between">
              <p className="font-medium text-gray-800">{activity.action}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
            <p className="text-sm text-gray-600">{activity.item}</p>
            <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
          </div>)}
      </div>
      <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800">
        View All Activity
      </button>
    </div>;
}