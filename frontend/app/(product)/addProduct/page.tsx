'use client'
import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);

  // State for categories (would typically come from an API)
  const [categories, setCategories] = useState([
    { _id: 'cat1', name: 'Electronics' },
    { _id: 'cat2', name: 'Clothing' },
    { _id: 'cat3', name: 'Books' }
  ]);

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validate form data
    if (!name || !sku || !category || price <= 0) {
      alert('Please fill in all required fields correctly');
      return;
    }

    const productData = {
      name,
      sku,
      quantity,
      category,
      price
    };

    try {
      // Send POST request to add product
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        // Reset form after successful submission
        setName('');
        setSku('');
        setQuantity(0);
        setCategory('');
        setPrice(0);
        alert('Product added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

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

            {/* SKU */}
            <div className="mb-4">
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                id="sku"
                name="sku"
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter SKU" />
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="0"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter quantity" />
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
    </div></>
  );
};

export default AddProduct;