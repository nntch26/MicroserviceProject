'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Product } from '@/types/types';
import { AddInventoryPrduct } from '@/app/api/InventoryServices';

const AddProduct = () => {
  // State for form fields
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/apiProducts/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  // Handle submit to create inventory
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || quantity <= 0) {
      alert('Please select a product and enter quantity');
      return;
    }

    const inventoryData = {
      productId: selectedProduct,
      quantity: quantity
    };

    try {
      const response = await AddInventoryPrduct(inventoryData);

      if (response) {
        setQuantity(0);
        setSelectedProduct('');
        alert('Inventory added successfully!');
      } else {
        alert('Failed to add inventory');
      }
    } catch (error) {
      console.error('Error adding to inventory:', error);
      alert('Failed to add inventory');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Product to Inventory
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
            {/* Product Dropdown */}
            <div className="mb-4">
              <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                Select Product
              </label>
              <select
                id="product"
                name="product"
                required
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - {product.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="0"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter quantity"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Add to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
