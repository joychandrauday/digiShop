import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useBrands = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: brands = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axiosPublic.get("/brands");
      return res.data;
    },
  });
  const allBrands = brands[0]?.brands;
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
  return allBrands;
};

export default useBrands;
