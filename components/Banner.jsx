import React from 'react'

const Banner = ({name, childStyles,parentStyles}) => {
  return (
    <div className={`relative w-full text-white flex items-center z-0 overflow-hidden nft-gradient ${parentStyles}`}>
    <p className={`font-bold text-5xl font-poppins leading-70 ${childStyles}`}>{name}</p>
    <div className='absolute w-64 h-64 sm:w-40 sm:h-40 rounded-full white-bg -top-24 -left-24 sm:-top-20 sm:-left-20 -z-5 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)]' style={{backgroundColor:'hwb(318deg 28% 7%)'}}/>
    <div className='absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full white-bg -bottom-24 -right-14 -z-5'/>
    </div>
  )
}

export default Banner