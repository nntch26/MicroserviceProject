'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchCategory, fetchProductById, updateProduct } from '@/app/api/productServices';
import { Category, Product } from '@/types/types';

const EditProduct = () => {
  const router = useRouter();

  const { id } = useParams() as {id:string}; // ID เปน string
  console.log("page param:",id)

  // State for form fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchCategories();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
        const product = await fetchProductById(id) as Product;
        console.log("product:", product)

      if (product) {
        setName(product.name);
        setCode(product.code);
        setCategory(product.category._id);
        setPrice(product.price);
      }
      
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchCategory();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!name || !code || !category || price <= 0) {
      alert('Please fill in all required fields correctly');
      return;
    }

    const productData = {
        name,
        code,
        category,
        price
    };
    try {
        const response = await updateProduct(id, productData);
        if(response){
            alert('Product updated successfully!');
            setTimeout(() => {
                router.push('/');
            }, 3000);
            
        }
      

    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  console.log("show product data:", name, code, category, price);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Edit Product</h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <input type="text" value={code} 
            onChange={(e) => setCode(e.target.value)} 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" value={price} 
            onChange={(e) => setPrice(Number(e.target.value))} 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
          <button type="submit" 
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
            Update Product
            </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
