"use client";

import React, { useEffect } from "react";
import { Box, Alert, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { fetchCategories } from "../../Redux/Slice/category/categorySlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CategoryCircleCards: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <Box />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const handleCategoryClick = (categoryId: string | number) => {
    router.push(`/category?id=${categoryId}`);
  };

  return (
    <div className="flex items-center justify-start lg:justify-center gap-4 py-6 overflow-x-scroll px-4 scrollbar-hide w-full">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="min-w-[80px] h-20 overflow-hidden object-cover relative flex justify-center rounded-full border-2 border-red-700 cursor-pointer"
        >
          <Image
            src={category.imageUrl}
            alt={category.title}
            height={1000}
            width={1000}
            className="object-cover w-full h-full"
          />
          <h2 className="absolute z-10 text-xs font-bold bg-white w-full text-center bottom-0">
            {category.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default CategoryCircleCards;
