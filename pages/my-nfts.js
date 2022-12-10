import React, { useContext, useEffect, useState } from "react";
import { Banner, Loader, NFTCard, SearchBar } from "../components";
import { NFTContext } from "../context/NFTContext";
import images from "../assets";
import Image from "next/image";
import { shortenAddress } from "../utils/shortenAddress";

const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSelect, setActiveSelect] = useState('Recently added');

  const { currentAccount, fetchMyNFTsOrListedNFTs } = useContext(NFTContext);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTs.length) {
      setNfts(filteredNFTs);
  }else {
    setNfts(nftsCopy)
  }}
  const onClearSearch = (value) => {
    if(nfts.length && nftsCopy.length) {
      setNfts(nftsCopy)
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs().then((items) => {
      setNfts(items);
      setNftsCopy(items)
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (ascending)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (descending)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles={"text-center mb-4"}
          parentStyles={"h-80 justify-center"}
        />
        <div className="flex-center flex-col -mt-20 z-0">
          <div className="flex-center w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src={images.creator1}
              className="object-cover rounded-full w-full"
              width={100}
              height={100}
              alt={"profile"}
            />
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
              {shortenAddress(currentAccount)}
            </p>
          </div>
        </div>
      </div>
      {!isLoading && nfts?.length === 0 && !nftsCopy.length ? (
        <div className="flexCenter sm:p-8 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl mt-6">
            NO NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col ">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8 my-6 sm:my-0 ">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard
                key={nft.tokenId}
                nft={nft}
                seller={nft.seller}
                onProfilePage
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
