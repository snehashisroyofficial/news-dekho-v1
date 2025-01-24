import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from ".././../Redux/store";
import Link from "next/link";

interface SidebarProps {
  openSideBar: boolean;
  setOpenSidebar: (state: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSideBar, setOpenSidebar }) => {
  const { topCategories } = useSelector(
    (state: RootState) => state.topCategory
  );

  return (
    <div>
      {openSideBar && (
        <div className="inset-0 fixed bg-red-800 text-white z-[9999] ">
          <div className=" flex flex-col items-center justify-center h-full gap-8">
            <button onClick={() => setOpenSidebar(false)}>
              <CloseIcon fontSize="large" />
            </button>
            <ul className="flex flex-col items-center justify-center gap-8 text-white overflow-y-auto scrollbar-hide">
              {topCategories.map((item, idx: number) => (
                <Link
                  onClick={() => setOpenSidebar(false)}
                  key={idx}
                  href={`/topic?id=${item.id} `}
                >
                  <li className=" text-xl font-semibold text-md text-white">
                    {item.topic}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
