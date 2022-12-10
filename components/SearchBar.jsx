import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import images from "../assets";

const SearchBar = ({handleSearch, activeSelect, setActiveSelect,clearSearch}) => {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState(search)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    
   const timer = setTimeout(()=> {
    setSearch(debounceSearch)
   }, 1000)

   return ()=> clearTimeout(timer)
    
    
  }, [debounceSearch])

  useEffect(()=> {
   if(search) {
    handleSearch(search)
   } else {
    clearSearch()
   }

  },[search])


  
  

  const { theme } = useTheme();
  return (
    <div className="flex-1 md:mt-6 flex justify-end sm:flex-col sm:max-w-md sm:w-full sm:self-center sm:mt-0">
        <div className="dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 py-2 rounded-md flex-1 flexCenter max-w-sm sm:mt-2 sm:max-w-xl min-w-190">
          <Image
            src={images.search}
            alt="search"
            width={20}
            height={20}
            className={`${theme === "light" ? "filter invert" : ""} object-contain`}
          />
          <input
            type={"text"}
            placeholder="Search NFT here..."
            className="w-full dark:bg-nft-black-2 bg-white mx-4 dark:text-white text-nft-black-1 font-normal text-xs outline-none"
            onChange={(e)=> {setDebounceSearch(e.target.value)}}
            value={debounceSearch}
          />
        </div>
        <div onClick={()=> setToggle((prevToggle) => !prevToggle)} className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md sm:py-3">
            <p className="font-popping dark:text-white text-nft-black-1 font-normal text-xs">{activeSelect}</p>
            <Image src={images.arrow} className={`${theme === "light" ? "filter invert" : ""} object-contain`} width={15} height={15} alt="arrow"/>
            {toggle && (
        <div
         className="absolute top-full left-0 right-0 w-full mt-3 z-10 mb-white border dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md ">
        {['Recently added','Price (ascending)','Price (descending)'].map((item,i) => (
            <p key={i}  onClick={()=> setActiveSelect(item)} className="font-popping dark:text-white text-nft-black-1 font-normal text-xs my-3 cursor-pointer">
            {item}
            </p>
        ))}
        </div>
        )}
        </div>
       
    </div>
  );
};

export default SearchBar;
