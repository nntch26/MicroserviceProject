'use client'
import { AddPrdouct, deleteProduct, fetchCategory } from '@/app/api/productServices';
import { Category } from '@/types/types';
import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
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



  // submission
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
      const response = await AddPrdouct(productData);

      if (response) {
        setName('');
        setCode('');
        setCategory('');
        setPrice(0);
        alert('Product added successfully!');
      } 

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };



  useEffect(() => {
    fetchCategories() 
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Product
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
            {/* Product Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product name" />
            </div>

            {/* code */}
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter code" />
            </div>

  

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
                step="0.01"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter price" />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddProduct;