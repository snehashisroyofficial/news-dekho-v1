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
    <div className="flex items-center justify-start lg:justify-center gap-4 py-6 overflow-x-auto px-4 scrollbar-hide">
      {categories.map((category) => (
        <Box
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          sx={{
            width: 80,
            height: 80,
            marginRight: 2,
            borderRadius: "100px",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <Image
            src={category.imageUrl}
            alt={category.title}
            height={1000}
            width={1000}
            className="object-cover rounded-full border-2 border-slate-200"
          />

          <Typography
            variant="body2"
            color="#6e6e6e"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 4,
              right: 4,
              textAlign: "center",
              padding: "2px 4px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "Noto Serif Bengali",
              color: "black",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {category.title}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default CategoryCircleCards;
