import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import useCategory from "../../hooks/useCategory";
import useBrands from "../../hooks/useBrands";
import { FaRegArrowAltCircleLeft, FaStar } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
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
    return <div>Error fetching products data</div>;
  }

  // Filter products based on the search query, selected category, brand, and price range
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

  // Sort products based on the selected sort option
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

  // Get the products for the current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [currentPage, sortedProducts, productsPerPage]);

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Pagination controls
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

  // Sort brands alphabetically
  const sortedBrands = allBrands?.sort((a, b) => a.localeCompare(b));

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
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {allCategories &&
              allCategories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
          </select>

          <label htmlFor="brand" className="mx-4">
            Brand:
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">All Brands</option>
            {sortedBrands &&
              sortedBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </option>
              ))}
          </select>

          <label htmlFor="price" className="mx-4">
            Price Range:
          </label>
          <select
            id="price"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">All Prices</option>
            <option value="0-1000">0 BDT - 1000 BDT</option>
            <option value="1001-20000">1001 BDT - 20000 BDT</option>
            <option value="20001-70000">20001 BDT - 70000 BDT</option>
            <option value="70001-200000">70001 BDT - 200000 BDT</option>
          </select>

          <label htmlFor="sort" className="mx-4">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="dateNewestFirst">Date Added: Newest First</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="border border-gray-300 rounded-md m-4 p-4 bg-white w-80 shadow-md relative"
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">
                  {product.productName}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <p className="text-blue-600 font-semibold mt-1">
                  Price: {product.price} BDT
                </p>
                <p className=" mt-1 absolute top-5 right-0">
                  <div className="badge bg-primary text-white rounded-none">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </div>
                </p>
                <p className="text-yellow-500 mt-1 flex gap-1 items-center absolute top-0 right-4">
                  <FaStar /> {product.ratings}
                </p>
                <p className="text-gray-500 mt-1">
                  Created On:{" "}
                  {new Date(product.creationDate).toLocaleDateString()}{" "}
                  {new Date(product.creationDate).toLocaleTimeString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No products found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="py-2 flex items-center gap-2 rounded-none px-4 bg-blue-900 text-white group mx-2"
          >
            <FaRegArrowAltCircleLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="py-2 flex items-center gap-2 rounded-none px-4 bg-blue-900 text-white group mx-2"
          >
            Next{" "}
            <FaRegArrowAltCircleRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Product;
