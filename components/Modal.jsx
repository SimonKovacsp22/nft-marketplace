import { useRef, useContext } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { NFTContext } from "../context/NFTContext";

import Button from "./Button";
import { shortenAddress } from "../utils/shortenAddress";

const Modal = ({ setPaymentModal, checkout }) => {
  const modalRef = useRef(null);
  const { theme } = useTheme();
  const router = useRouter();

  const { nftCurrency } = useContext(NFTContext);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setPaymentModal(false);
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
              onClick={() => setPaymentModal(false)}
            >
              &#10005;
            </p>
          </div>
          <div className="text-center">
            <h2 className="font-poppins dark:text-white text-nft-black-2 font-normal text-xl minlg:text-3xl pb-6">
              Check Out
            </h2>
          </div>
          <div className="border-y dark:border-nft-black-3 border-nft-gray-1 flex flex-col justify-between px-8 py-6">
            <div className="flex justify-between">
              <p className="font-poppins pb-6 font-semibold  dark:text-nft-gray-1 text-nft-gray-3 xs:hidden">
                Item
              </p>
              <p className="font-poppins font-semibold  dark:text-nft-gray-1 text-nft-gray-3 xs:hidden">
                Subtotal
              </p>
            </div>
            <div>
              <div className="flex justify-between xs:items-center">
                <p className="font-poppins pb-6 font-semibold  dark:text-nft-gray-1 text-nft-gray-3 hidden xs:block xxs:hidden">
                  Item
                </p>
                <div className="flex xs:flex-col">
                  <Image
                    src={router.query.image}
                    className="object-contain"
                    width={100}
                    height={100}
                    alt={router.query.name}
                  />
                  <div className="px-4 justify-center flex flex-col xs:px-0">
                    <p
                      className={
                        "text-md font-semibold dark:text-nft-gray-1 text-nft-black-2 xs:pt-2"
                      }
                    >
                      {router.query.name}
                    </p>
                    <p
                      className={
                        "text-sm dark:text-nft-gray-1 text-nft-black-2"
                      }
                    >
                      {shortenAddress(router.query.seller)}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold font-poppins dark:text-white text-nft-black-2 xs:hidden">
                  {router.query.price} <span>{nftCurrency}</span>
                </p>
              </div>
              <div className={"hidden xs:flex justify-between pt-8"}>
                <p className="font-poppins font-semibold  dark:text-nft-gray-1 text-nft-gray-3">
                  Subtotal
                </p>
                <p className="font-poppins text-sm font-semibold dark:text-white text-nft-black-2">
                  {router.query.price} <span>{nftCurrency}</span>
                </p>
              </div>
              <div className="flex flex-row justify-between pt-8 xs:pt-0">
                <p className="font-poppins font-semibold dark:text-nft-gray-1 text-nft-gray-3">
                  Total
                </p>
                <p className="font-poppins text-sm font-semibold dark:text-white text-nft-black-2">
                  {router.query.price} <span>{nftCurrency}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flexCenter pt-6 sm:flex-col sm:pt-3 ">
            <Button
              btnName={"Checkout"}
              classStyles={
                "px-7 py-2 rounded-xl w-32 sm:w-64 mr-2 sm:mr-0 h-10 sm:mb-3 xs:w-5/6"
              }
              handleClick={checkout}
            ></Button>
            <Button
              btnName={"Cancel"}
              handleClick={() => setPaymentModal(false)}
              classStyles={
                "px-7 py-2 rounded-xl w-32 sm:w-64 ml-2 sm:ml-0 transparent-bg-0 border-2 border-nft-red-violet text-nft-red-violet xs:w-5/6"
              }
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
