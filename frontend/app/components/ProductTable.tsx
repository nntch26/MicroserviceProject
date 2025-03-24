import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Pencil, Trash2, Archive  } from "lucide-react";
import { Product } from "@/types/types";
import { deleteProduct, fetchAllProduct } from "../api/productServices";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface ProductTableProps {
  limit?: number;
  showActions?: boolean;
  products?: Product[];
}

export function ProductTable({ limit, showActions = false, products = [] }: ProductTableProps) {
  const [productList, setProductList] = useState<Product[]>([]);
  const router = useRouter();


  console.log("Products Search : " ,products)

  const fetchProducts= async () => {

    if (products?.length > 0) {
      setProductList(products);
      
      return;

    }else{

        try{
        const response  = await fetchAllProduct()

        console.log("Products fetchdata : " ,response)
        setProductList(response)

      }catch(error){
        console.log(error)
      }
    }

    
  }

  // ลบ product
  const handleDelete = async (productId:string) => {
    try {
      const response = await deleteProduct(productId);

      if (response) {
        alert('Product deleted successfully!');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  }

  
    
  
  useEffect(() => {
    fetchProducts() 
  }, [products]);

  const displayedProducts = limit ? productList.slice(0, limit) : productList;


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CODE</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UPDATE</th>
            {showActions && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productList.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 7 : 6} className="px-6 py-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : (
            displayedProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.last_updated}</div>
                </td>
               
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/editProduct/${product._id}`}>
                      <button className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer">
                        <Pencil size={16} />
                      </button>
                    </Link>
                    
                    <button className="text-red-600 hover:text-red-900 cursor-pointer"
                    onClick={() => handleDelete(product._id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
