import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopCategories } from "../../../Redux/Slice/category/topCategorySlice";
import { AppDispatch, RootState } from "../../../Redux/store";
import React from "react";
import { useRouter } from "next/navigation";

const HorizontalTagScrollList = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { topCategories, loading, error } = useSelector(
    (state: RootState) => state.topCategory
  );

  useEffect(() => {
    dispatch(fetchTopCategories());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  const handleCategoryClick = (categoryId: string | number) => {
    router.push(`/topic?id=${categoryId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        backgroundColor: "#991B1B",
        width: "100%",
        whiteSpace: "nowrap",
      }}
    >
      <style>
        {`
          /* Hide scrollbar in webkit browsers */
          .horizontal-scroll::-webkit-scrollbar {
            display: none;
          }
          /* For Firefox */
          .horizontal-scroll {
            scrollbar-width: none;
          }
        `}
      </style>

      <div
        className="horizontal-scroll "
        style={{
          display: "flex",
          overflowX: "auto",
          backgroundColor: "#991B1B",
          padding: "0px 0px",
          width: "100%",
          whiteSpace: "nowrap",
        }}
      >
        <div>
          <ul className="flex gap-4 px-6 font-bold text-white py-2 ">
            {topCategories.map((category) => (
              <li
                className="hover:bg-white hover:text-red-900 hover:cursor-pointer p-2"
                key={category.id}
                onClick={() => {
                  handleCategoryClick(category.id);
                }}
              >
                {category.topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTagScrollList;
