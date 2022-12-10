import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useContext} from 'react'
import { NFTContext } from '../context/NFTContext';
    

import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";
const NFTCard = ({ nft, seller, description, onProfilePage }) => {

  const {nftCurrency} = useContext(NFTContext)
  return (
    <Link
      className=" sm:mr-4 md:mx-0 "
      href={{ pathname: "/nft-details", query:  nft  }}
    >
      <div className="min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256
       minlg:min-w-327 dark:bg-nft-black-3 mb-white rounded-2xl p-4 m-4 minlg:m-8 sm:mx-2 cursor-pointer shadow-md">
       <div className="relative w-full h-52 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden flex">
        <Image className="object-cover w-full" src={nft.image || images.nft1} alt={nft.name || 'imagex'} width={200} height={400} />
       </div>
        <div
        className="mt-3 flex flex-col">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{nft.name}</p>
            <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">{nft.price || nft.formatedPrice} <span className="normal">{nftCurrency}</span></p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">{onProfilePage ? shortenAddress(nft.owner) : shortenAddress(nft.seller)}</p>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
