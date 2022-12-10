import {useContext} from "react";

import { NFTContext } from "../context/NFTContext";



const Input = ({ inputType, title, placeholder, setFormInput, formInput,setPrice }) => {

  const {nftCurrency} = useContext(NFTContext)
  return (
    <div className="mt-10 w-full ">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        {title}
      </p>
      {inputType === "number" ? (
        <div
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 
                rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row"
        >
          <input
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            type={"number"}
            placeholder={placeholder}
            onChange={setPrice ? (e)=> {setPrice(e.target.value)} : (e)=> {setFormInput({...formInput, price:e.target.value })}} 
          />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            {nftCurrency}
          </p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 
                 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          rows={10}
          placeholder={placeholder}
          onChange={(e)=> {setFormInput({...formInput,description:e.target.value })}}
        />
      ) : (
        <input
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 
                 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          type={inputType}
          placeholder={placeholder}
          onChange={(e)=> {setFormInput({...formInput,name:e.target.value })}}
        />
      )}
    </div>
  );
};

export default Input;