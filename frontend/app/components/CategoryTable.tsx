"use client";
import React, { Component, useEffect, useState } from "react";
import { Package, Pencil, Trash2, Archive,Tags   } from "lucide-react";
import { Category } from "@/types/types";
import { fetchCategory } from "../api/productServices";


export function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try{
      const response  = await fetchCategory()

      console.log("Category fetchdata : " ,response)
      setCategories(response)

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories() 
  }, []);
  

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
            {/* <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category._id} className="hover:bg-gray-50">
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Tags  className="h-5 w-5 text-gray-500" />
                  </div>

                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </div>
                </div>
                

              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  {category.description}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
