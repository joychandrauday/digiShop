import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import useCategory from '../../hooks/useCategory';

const Product = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const axiosPublic = useAxiosPublic();
  const categories = useCategory();
  const allCategories = categories[0]?.document.categories;

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

  // Filter products based on the search query and selected category
  const filteredProducts = products
    .filter(product =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product =>
      selectedCategory ? product.category === selectedCategory : true
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="pt-8 px-6 py-10">
        {/* Search Bar */}
        <div className="my-6 text-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 w-80 text-center border border-gray-300 rounded-md"
          />
        </div>

        {/* Filter Options */}
        <div className="mb-6 text-center">
          <label htmlFor="category" className="mr-2">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {allCategories && allCategories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="border border-gray-300 rounded-md m-4 p-4 bg-white w-80 shadow-md">
                <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-lg font-semibold mt-2">{product.productName}</h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <p className="text-blue-600 font-semibold mt-1">Price: {product.price} BDT</p>
                <p className="text-yellow-500 mt-1">Ratings: {product.ratings}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No products found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-8">
          <button className="py-2 px-4 bg-blue-900 text-white rounded-md mx-2">Previous</button>
          <button className="py-2 px-4 bg-blue-900 text-white rounded-md mx-2">Next</button>
          <span className="mx-4">Page 1 of 10</span>
        </div>
      </main>
    </div>
  );
};

export default Product;
