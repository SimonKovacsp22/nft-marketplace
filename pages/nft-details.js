import React, { useContext, useEffect, useState } from "react";
import { Button, Loader, Modal, Success } from "../components";
import { NFTContext } from "../context/NFTContext";
import images from "../assets";
import Image from "next/image";
import { shortenAddress } from "../utils/shortenAddress";
import { useRouter } from "next/router";

const NFTDetails = () => {
  const { currentAccount, nftCurrency, buyNFT, isGlobalLoading } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();

  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };

  useEffect(() => {

    if (!router.isReady) return;
    setNft(router.query);
    setIsLoading(false);
  }, [router.isReady]);

  if (isGlobalLoading) return <Loader />;

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flex justify-center sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1 items-start">
        <div className="relative w-557  sm:w-300 sm:h-300 h-557 rounded-xl">
          <Image
            src={nft.image}
            className="object-cover rounded-xl shadow-lg w-300"
            fill
            alt={nft.name}
          />
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:bp-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-popping dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>
        <div className="mt-10">
          <p className="font-popping dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>
        </div>
        <div className="flex flex-row items-center mt-3">
          <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
            <Image
              className="object-cover rounded-full"
              src={images.creator1}
              alt="creator"
            />
          </div>
          <p className="font-popping dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
            {shortenAddress(nft.seller)}
          </p>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-popping font-medium dark:text-white text-nft-black-1 text-base minlg:text-base mb-2">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-popping font-normal dark:text-white text-nft-black-1 text-base">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="font-popping font-normal dark:text-white text-nft-black-1 text-base border-gray py-2">
              You are the seller
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (<Button classStyles={"mr-5 sm:mr-0 sm:mb-5 rounded-xl"}
              btnName={`List in Market`}
              handleClick={() => router.push(`/resell-nfts?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}/>) :
          (
            <Button
              classStyles={"mr-5 sm:mr-0 rounded-xl"}
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>
      {paymentModal && (
        <Modal setPaymentModal={setPaymentModal} checkout={checkout} />
      )}
      {successModal && <Success setSuccessModal={setSuccessModal} />}
    </div>
  );
};

export default NFTDetails;
