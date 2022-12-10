import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { MarketAddress, MarketAddressABI } from "./constants";



const auth =
  "Basic " +
  Buffer.from(
    "2I7tWSopyUV0NDuXvJ3DxTQzbvY" + ":" + "a9f303ca438cc38dc9035723b063cc88"
  ).toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  protocol: "https",
  port: 5001,
  headers: { authorization: auth },
});

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isGlobalLoading, setIsGlobalLoading] = useState(false)
  const nftCurrency = "ETH";

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install Metamask!");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No account found.");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install Metamask!");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file, setFileUrl) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://simonkovac.infura-ipfs.io/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log("Error uploading NFT Image!");
    }
  };

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);

      const url = `https://simonkovac.infura-ipfs.io/ipfs/${added.path}`;

      const response = await createSale(url, price);

      router.push("/");
    } catch (error) {
      console.log("Error ulploading NFT!");
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3modal = new Web3Modal();

    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice.toString(), "ether");

    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, { value : listingPrice.toString(), })
      : await contract.resellToken(id,  price, { value : listingPrice.toString(), });

      setIsGlobalLoading(true)
    await transaction.wait();
  };

  const fetchNFTs = async () => {
    setIsGlobalLoading(false)
    const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/SA9FrsOTOKcbM2lBdi2MrQR-fTPnjkIQ');
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();


    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const formatedPrice = ethers.utils.formatUnits(
          price.toString(),
          "ether"
        );

        return {
          formatedPrice,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );

    return items;
  };

  const fetchMyNFTsOrListedNFTs = async (type) => {
    setIsGlobalLoading(false)
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const data =
      type === "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );

        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );

    return items;
  };

  const buyNFT = async (nft) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    setIsGlobalLoading(true)
    const transaction = await contract.createMaketSale(nft.tokenId, {
      value: price,
    });

    await transaction.wait();
    setIsGlobalLoading(false)
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        isGlobalLoading
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
