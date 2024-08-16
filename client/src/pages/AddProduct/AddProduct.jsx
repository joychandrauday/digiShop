import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useCategory from "../../hooks/useCategory";
import useBrands from "../../hooks/useBrands";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const axiosPublic =useAxiosPublic()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch categories and brands
  const allCategories = useCategory();
  const brands = useBrands();

  // Safely check if categories are available
  const categories =
    allCategories.length > 0 ? allCategories[0].categories : [];

  const onSubmit = (data) => {
    // Add selected brand and category to the data object
    data.brand = selectedBrand;
    data.category = selectedCategory;

    console.log("Form Submitted:", data);
    axiosPublic
      .post("/products", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          toast.success("Yopur product has been added...");
        } else {
          toast.error("Transaction failed. Please check your credentials."); // Notify user if login fails
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Name
            </label>
            <input
              {...register("productName", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Product Name"
            />
            {errors.productName && (
              <p className="text-red-500 text-xs italic">
                Product Name is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Image URL
            </label>
            <input
              {...register("productImage", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Product Image URL"
            />
            {errors.productImage && (
              <p className="text-red-500 text-xs italic">
                Product Image URL is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Product Description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                Description is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price (BDT)
            </label>
            <input
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs italic">Price is required.</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Brand:
            </label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">All Brands</option>
              {Array.isArray(brands) &&
                brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand.charAt(0).toUpperCase() + brand.slice(1)}
                  </option>
                ))}
            </select>
            {!Array.isArray(brands) && (
              <p className="text-red-500 text-xs italic">
                Error loading brands. Please try again later.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select a Category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ratings
            </label>
            <input
              type="number"
              step="0.1"
              {...register("ratings", {
                required: true,
                min: 0,
                max: 5,
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ratings"
            />
            {errors.ratings && (
              <p className="text-red-500 text-xs italic">
                Ratings must be between 0 and 5.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Creation Date
            </label>
            <input
              type="datetime-local"
              {...register("creationDate", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.creationDate && (
              <p className="text-red-500 text-xs italic">
                Creation Date is required.
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
