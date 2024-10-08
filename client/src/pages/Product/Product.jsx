import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import useCategory from "../../hooks/useCategory";
import useBrands from "../../hooks/useBrands";
import cursor from "../../assets/images/icons8-cursor-188.png"
import {
  FaRegArrowAltCircleLeft,
  FaStar,
  FaRegArrowAltCircleRight,
  FaSearch,
} from "react-icons/fa";

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

  // Refetch data whenever filter or sort options change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page whenever a filter or sort is changed
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortOption]);

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "products",
      searchQuery,
      selectedCategory,
      selectedBrand,
      priceRange,
      sortOption,
      currentPage,
    ],
    queryFn: async () => {
      const params = {
        searchQuery,
        category: selectedCategory,
        brand: selectedBrand,
        priceRange,
        sortOption,
        page: currentPage,
        limit: productsPerPage,
      };
      const res = await axiosPublic.get("/products", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center backdrop-blur">
        <div className="wraap">
          <img src={cursor} alt="" className="animate-bounce"/>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Error fetching products data
      </div>
    );
  }

  const { allproducts, totalPages } = productData;

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.searchtext.value;
    setSearchQuery(searchText);
  };
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 lg:p-12">
      {/* Main Content */}
      <main className="container mx-auto">
        {/* Search Bar */}
        <form action="" onSubmit={handleSubmit}>
          <div className="my-6 flex justify-center items-center relative gap-1">
            <input
              type="text"
              name="searchtext"
              placeholder={
                searchQuery
                  ? `all products related to ${searchQuery}.`
                  : "Search for products..."
              }
              className="p-3 w-full max-w-md text-center border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            />
            <button
              type="submit"
              className="transform p-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none"
            >
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Filter Options */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="category" className="text-lg font-semibold">
              Category:
            </label>
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
            <label htmlFor="brand" className="text-lg font-semibold">
              Brand:
            </label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Brands</option>
              {allBrands &&
                allBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand.charAt(0).toLowerCase() + brand.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="price" className="text-lg font-semibold">
              Price Range:
            </label>
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
            <label htmlFor="sort" className="text-lg font-semibold">
              Sort By:
            </label>
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
          {allproducts.length > 0 ? (
            allproducts.map((product) => (
              <div
                key={product._id}
                className="w-full sm:w-80 md:w-72 lg:w-80 xl:w-80 p-4 bg-white relative rounded-lg shadow-lg overflow-hidden m-2"
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-xl font-semibold mt-2 truncate">
                  {product.productName}
                </h2>
                <p className="text-gray-700 mt-1 truncate">
                  {product.description}
                </p>
                <p className="text-blue-600 font-semibold mt-1">
                  Price: {product.price} BDT
                </p>
                <div className="flex  flex-col-reverse items-end mt-2 absolute top-0 right-0">
                  <div className="badge rounded-none badge-primary">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </div>
                  <p className="ml-auto text-warning font-bold flex items-center gap-1 pr-2 badge rounded-none badge-primary">
                    <FaStar /> {product.ratings}
                  </p>
                </div>
                <p className="text-gray-500 text-sm mt-1">
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
        <div className="flex justify-center my-8 gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 btn py-2 bg-blue-900 text-white rounded-lg shadow-md disabled:opacity-50 transition-opacity group"
          >
            <FaRegArrowAltCircleLeft className="inline-block mr-2 group-hover:-translate-x-2 transition-transform" />{" "}
            Previous
          </button>
          <div className="mx-3 flex items-center">
            Page {currentPage} of {totalPages}.
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 btn py-2 bg-blue-900 text-white rounded-lg shadow-md disabled:opacity-50 transition-opacity group"
          >
            Next{" "}
            <FaRegArrowAltCircleRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Product;
