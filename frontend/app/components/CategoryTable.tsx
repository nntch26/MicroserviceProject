import React, { Component } from "react";
import { Pencil, Trash2 } from "lucide-react";
interface Category {
  id: number;
  name: string;
  description: string;
}
export function CategoryTable() {
  const categories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices and gadgets",
    },
    {
      id: 2,
      name: "Accessories",
      description: "Device accessories and add-ons",
    },
    {
      id: 3,
      name: "Computer Parts",
      description: "Components and parts for computers",
    },
    {
      id: 4,
      name: "Networking",
      description: "Networking equipment and accessories",
    },
    {
      id: 5,
      name: "Storage",
      description: "Storage devices and solutions",
    },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {category.name}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  {category.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Pencil size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
