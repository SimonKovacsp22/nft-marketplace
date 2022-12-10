import React from "react";

const Logo = ({title}) => {
  return (
 
    <div className="flexCenter cursor-pointer">
       <div>
      <div
        className="float-left"
        style={{
          borderRight: "10px solid #eb1484",
          borderTop: "17px solid transparent",
          borderBottom: "17px solid transparent",
          borderRadius: "50%",
        }}
      ></div>
      <div
        className="float-left relative nft-gradient "
        style={{
          backgroundColor: "#6C6",
          width: "20px",
          height: "34px",
          borderRadius: "10px",
        }}
      >
        <div className="w-4 h-4 border-2 border-nft-dark rounded-full absolute  top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4"></div>
      </div>
      <div
        className="float-left"
        style={{
          borderLeft: "10px solid #C81CC5",
          borderTop: "17px solid transparent",
          borderBottom: "17px solid transparent",
          borderRadius: "50%",
        }}
      ></div>
    </div>
<p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-2">
             {title}
            </p>
</div>
  );
};

export default Logo;
