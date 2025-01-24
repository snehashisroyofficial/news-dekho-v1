// import { Icon } from "@iconify/react/dist/iconify.js";

import React, { MouseEvent, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface SearchModalProp {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchModalProp> = ({ closeModal }) => {
  const ModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  //   modal close
  const onClose = (e: MouseEvent<HTMLDivElement>) => {
    if (ModalRef.current === e.target) {
      closeModal(false);
    }
  };

  const handleFormSubmit = (e: string) => {
    e.preventDefault();
    const data = e.target.text.value;
    navigate(`/search?article=${data}`);
    closeModal(false);
  };

  return (
    <div
      ref={ModalRef}
      onClick={onClose}
      className="inset-0 fixed  backdrop-blur-lg flex justify-center items-center  z-[999] "
    >
      <div className="p-8 md:p-16 rounded-3xl  max-w-64 mx-auto md:max-w-xl lg:max-w-3xl w-full bg-red-800 relative">
        <button
          onClick={() => closeModal(false)}
          className="absolute right-8 top-8"
        >
          <CloseIcon className="text-white text-4xl" />
        </button>

        <div className=" text-center w-full py-10 space-y-2 text-white">
          <h1 className="text-2xl md:text-5xl font-semibold">
            আপনার প্রিয় খবর অনুসন্ধান করুন
          </h1>
          <p className="font-semibold">
            পছন্দের বিষয় নিয়ে পড়ুন এবং আপডেট থাকুন
          </p>
        </div>
        <form
          onSubmit={handleFormSubmit}
          action=""
          className="w-full flex relative"
        >
          <input
            type="text"
            name="text"
            placeholder="search here....."
            className="w-full outline-0  focus:border-black  border-2  px-8 py-4 bg-white"
          />
          <button className="absolute right-6 top-0 bottom-0">
            <SearchIcon fontSize="large" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
