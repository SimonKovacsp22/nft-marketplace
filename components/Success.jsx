import React from 'react'
import { useRef, useContext } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { NFTContext } from "../context/NFTContext";

import Button from "./Button";
import { shortenAddress } from "../utils/shortenAddress";

const Success = ({setSuccessModal}) => {
    const modalRef = useRef(null);
  const { theme } = useTheme();
  const router = useRouter();

  const { nftCurrency } = useContext(NFTContext);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          setSuccessModal(false);
        }
      };
  return (
    <div className="fixed inset-0  h-screen z-50">
    <div
      className="fixed opacity-100  inset-0 -z-5 bg-overlay-black animated fadeIn"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 
      -translate-x-1/2 dark:bg-nft-dark bg-white  pb-6 sm:pb-3 w-[32rem] rounded-md animated fadeIn sm:left-4 sm:right-4 sm:w-auto sm:translate-x-0"
      >
        <div className="flex justify-end ">
          <p
            className="pt-3 pr-4 font-bold hover:cursor-pointer"
            onClick={() => setSuccessModal(false)}
          >
            &#10005;
          </p>
        </div>
        <div className="text-center">
          <h2 className="font-poppins dark:text-white text-nft-black-2 font-normal text-xl minlg:text-3xl pb-6">
            Payment Succesful
          </h2>
        </div>
        <div className="border-y dark:border-nft-black-3 border-nft-gray-1 flex flex-col justify-between px-8 py-6">
          
          <div>
            <div className="flex justify-center xs:items-center">
              
              
                <Image
                  src={router.query.image}
                  className="object-contain"
                  width={150}
                  height={150}
                  alt={router.query.name}
                />
                
              
              
            </div>
            
            <div className=" pt-8 xs:pt-0">
              <p className="font-poppins font-normal dark:text-nft-gray-1 text-nft-gray-3 text-sm text-center">
                You succesfull purchased <span className='font-semibold'>{router.query.name}</span> from <span className='font-semibold'>{shortenAddress(router.query.seller)}</span>
              </p>
             
            </div>
          </div>
        </div>
        <div className="flexCenter pt-6 sm:flex-col sm:pt-3 ">
          <Button
            btnName={"Check it out"}
            classStyles={
              "px-7 py-2 rounded-xl  sm:w-64 mr-2 sm:mr-0 h-10 sm:mb-3 xs:w-5/6"
            }
            handleClick={()=> router.push('/my-nfts')}
          ></Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Success