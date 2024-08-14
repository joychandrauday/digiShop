import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../hooks/useAxiosPublic';

const Product = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching products data</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Content */}
      <main className="px-6 py-10">
        <h1 className="text-center text-4xl font-semibold text-blue-900">Welcome to digiShop</h1>
        <p className="text-center text-lg text-gray-600">Digitalise Your Shopping Experience</p>

        {/* Search Bar */}
        <div className="my-6 text-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="p-3 w-80 border border-gray-300 rounded-md"
          />
        </div>

        {/* Filter Options */}
        <div className="mb-6 text-center">
          <label htmlFor="category" className="mr-2">Category:</label>
          <select id="category" className="p-3 border border-gray-300 rounded-md">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>

          <label htmlFor="price" className="mx-4">Price Range:</label>
          <select id="price" className="p-3 border border-gray-300 rounded-md">
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101-200">$101 - $200</option>
          </select>

          <label htmlFor="brand" className="mx-4">Brand:</label>
          <select id="brand" className="p-3 border border-gray-300 rounded-md">
            <option value="">All Brands</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            <option value="brand3">Brand 3</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-300 rounded-md m-4 p-4 bg-white w-80 shadow-md">
              <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-lg font-semibold mt-2">{product.productName}</h2>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-1">Price: {product.price} BDT</p>
              <p className="text-yellow-500 mt-1">Ratings: {product.ratings}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-8">
          <button className="py-2 px-4 bg-blue-900 text-white rounded-md mx-2">Previous</button>
          <button className="py-2 px-4 bg-blue-900 text-white rounded-md mx-2">Next</button>
          <span className="mx-4">Page 1 of 10</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-4">
        <p>&copy; 2024 digiShop. All rights reserved.</p>
        <p>
          <a href="#" className="hover:underline">Privacy Policy</a> | 
          <a href="#" className="hover:underline">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default Product;
