import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import useCategory from "../../hooks/useCategory";
import useBrands from "../../hooks/useBrands";
import { FaRegArrowAltCircleLeft, FaStar, FaRegArrowAltCircleRight } from "react-icons/fa";

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); // Number of products per page

  const axiosPublic = useAxiosPublic();
  const categories = useCategory();
  const allCategories = categories[0]?.categories;
  const allBrands = useBrands();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
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
    return <div className="text-center text-red-600">Error fetching products data</div>;
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) =>
      selectedBrand ? product.brand === selectedBrand : true
    )
    .filter((product) => {
      if (!priceRange) return true;
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      return product.price >= minPrice && product.price <= maxPrice;
    });

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    switch (sortOption) {
      case "priceLowToHigh":
        return a.price - b.price;
      case "priceHighToLow":
        return b.price - a.price;
      case "dateNewestFirst":
        return new Date(b.creationDate) - new Date(a.creationDate);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const sortedBrands = allBrands?.sort((a, b) => a.localeCompare(b));

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 lg:p-12">
      {/* Main Content */}
      <main className="container mx-auto">
        {/* Search Bar */}
        <div className="my-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 w-full max-w-md text-center border border-gray-300 rounded-lg shadow-md"
          />
        </div>

        {/* Filter Options */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="category" className="text-lg font-semibold">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              {allCategories &&
                allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="brand" className="text-lg font-semibold">Brand:</label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Brands</option>
              {sortedBrands &&
                sortedBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand.charAt(0).toUpperCase() + brand.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="price" className="text-lg font-semibold">Price Range:</label>
            <select
              id="price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Prices</option>
              <option value="0-1000">0 BDT - 1000 BDT</option>
              <option value="1001-20000">1001 BDT - 20000 BDT</option>
              <option value="20001-70000">20001 BDT - 70000 BDT</option>
              <option value="70001-200000">70001 BDT - 200000 BDT</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-lg font-semibold">Sort By:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Default</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="dateNewestFirst">Date Added: Newest First</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="w-full sm:w-80 md:w-72 lg:w-80 xl:w-80 p-4 bg-white rounded-lg shadow-lg overflow-hidden m-2"
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-xl font-semibold mt-2 truncate">{product.productName}</h2>
                <p className="text-gray-700 mt-1 truncate">{product.description}</p>
                <p className="text-blue-600 font-semibold mt-1">Price: {product.price} BDT</p>
                <div className="flex items-center mt-2">
                  <div className="badge badge-primary">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                  <p className="ml-auto text-yellow-500 flex items-center gap-1">
                    <FaStar /> {product.ratings}
                  </p>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Created On: {new Date(product.creationDate).toLocaleDateString()} {new Date(product.creationDate).toLocaleTimeString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No products found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-8 gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg shadow-md disabled:opacity-50 transition-opacity"
          >
            <FaRegArrowAltCircleLeft className="inline-block mr-2" /> Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg shadow-md disabled:opacity-50 transition-opacity"
          >
            Next <FaRegArrowAltCircleRight className="inline-block ml-2" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Product;
