import {useState, useMemo, useCallback, useContext}from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import images from '../assets'
import { Input, Button, Loader } from '../components'
import { NFTContext } from '../context/NFTContext'

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, setFormInput] = useState({price:'',name:'',description:''})
  const {theme} = useTheme()
  const {uploadToIPFS, createNFT,isGlobalLoading} = useContext(NFTContext)
  const router = useRouter()

  const onDrop =  useCallback(async(acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0])

    setFileUrl(url);
  },[])

  const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000, 
  })
  const fileStyle = useMemo(()=>(
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
      ${isDragActive && 'border-file-active'}
      ${isDragAccept && 'border-file-accept'}
      ${isDragReject && 'border-file-reject'}
      `
  ),[isDragAccept,isDragActive, isDragReject])

  if (isGlobalLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }
  
  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-3/5 md:w-full'>
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
          Create new NFT
        </h1>
        <div className='mt-16'>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload File</p>
          <div className='mt-4'>
              <div {...getRootProps()} className={fileStyle}>
                <input {...getInputProps()}/>
                <div className='flexCenter flex-col text-center'>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM, Max 100mb.</p>
                <div className='my-12 w-full flex justify-center'>
                  <Image src={images.upload} width={100} height={100} alt="file upload" className={`object-contain ${theme === 'light' && 'filter invert'}`} />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag and Drop Files</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">or Browse media on your device</p>
                </div>
              </div>
              {
                fileUrl && (
                  <aside>
                    <div>
                      <img src={fileUrl} alt='asset_file' />
                    </div>
                  </aside>
                )
              }
          </div>
        </div>
        <Input inputType="input" title="Name" placeholder="NFT Name" setFormInput={setFormInput} formInput={formInput} />
        <Input inputType="textarea" title="Description" placeholder="NFT Description" setFormInput={setFormInput} formInput={formInput}/>
        <Input inputType="number" title="Price" placeholder="NFT Price" setFormInput={setFormInput} formInput={formInput} />
        <div className='mt-7 w-full flex justify-end'>
          <Button btnName={"Create NFT"} classStyles="rounded-xl" handleClick={()=>createNFT(formInput, fileUrl, router)}></Button>
        </div>
      </div>
    </div>
  )
}

export default CreateNFT