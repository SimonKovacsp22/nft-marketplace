import { useState, useEffect, useRef, useContext } from "react";
import { useTheme } from "next-themes";
import { Banner, CreatorCard, Loader, NFTCard,SearchBar } from "../components";
import { NFTContext } from "../context/NFTContext";
import images from "../assets";
import {getCreators} from '../utils/getTopCreators'
import Image from "next/image";
import { shortenAddress } from "../utils/shortenAddress";
const Home = () => {
  const [hideButton, setHideButton] = useState(false);
  const [nfts, setNfts] = useState([1]);
  const [nftsCopy, setNftsCopy] = useState([1]);
  const [activeSelect, setActiveSelect] = useState('Recently added')
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true)

  const { theme } = useTheme();

  const { fetchNFTs } = useContext(NFTContext);

  const handleSrcoll = (direction) => {
    const { current } = scrollRef;

    const scrollLength = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollLength;
    } else {
      current.scrollLeft += scrollLength;
    }
  };
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      return setHideButton(false);
    } else {
      return setHideButton(true);
    }
  };
  
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
    isScrollable();
    window.addEventListener("resize", isScrollable);

    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  const topCreators = getCreators(nftsCopy)



  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
      setNftsCopy(items);
      setIsLoading(false)
    });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (ascending)':
        setNfts(sortedNfts.sort((a, b) => a.formatedPrice - b.formatedPrice));
        break;
      case 'Price (descending)':
        setNfts(sortedNfts.sort((a, b) => b.formatedPrice - a.formatedPrice));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);


  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={(<>Discover, collect and sell<br/> extraordinary NFTs</>)}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        {!isLoading && !nfts.length ? (<h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">That&apos;s is wierd... NO NFTs for sale!</h1>):
        isLoading ? <Loader/> : (
          <>
          <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Top Sellers
          </h1>
          <div
            className="relative flex flex-1 max-w-full mt-3 "
            ref={parentRef}
          >
            <div
              className="flex flex-row select-none overflow-x-scroll no-scrollbar w-max"
              ref={scrollRef}
            >
              {topCreators.map((creator,i) => (
                <CreatorCard
                  key={creator.seller}
                  rank={i+1}
                  creatorImage={images[`creator${i + 1}`]}
                   creatorName={shortenAddress(creator.seller)}
                  creatorEths={creator.sum}
                />
              ))}

              {!hideButton && (
                <>
                  <div
                    onClick={() => handleSrcoll("left")}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                  >
                    <Image
                      src={images.left}
                      className={`object-contain ${
                        theme === "light" ? "filter invert" : ""
                      }`}
                      alt="left_arrow"
                    />
                  </div>
                  <div
                    onClick={() => handleSrcoll("right")}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                  >
                    <Image
                      src={images.right}
                      className={`object-contain ${
                        theme === "light" ? "filter invert" : ""
                      }`}
                      alt="right_arrow"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex flex-row justify-between items-center mx-4 sx:mx-0 minlg:mx-8 md:justify-start  sm:items-start  sm:flex-col md:gap-8 sm:gap-0 ">
            <h1 className="flex font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4 flex-1 md:flex-grow-0">
              Hot NFTs
            </h1>
            <SearchBar handleSearch={onHandleSearch} clearSearch={onClearSearch} activeSelect={activeSelect} setActiveSelect={setActiveSelect}/>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard
                key={`nft-${nft.tokenId}`}
                nft={{
                  image:nft.image,
                  name: nft.name,
                  seller: nft.seller,
                  owner: nft.owner,
                  price: nft.formatedPrice,
                  description: nft.description,
                  tokenId: nft.tokenId
                }}
              />
            ))}
          </div>
        </div>
          </>
        )}
       
      </div>
    </div>
  );
};

export default Home;
