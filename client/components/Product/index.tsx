import React, { memo } from 'react'
import { IProduct } from '../../types/Product'
import { BsCart } from "react-icons/bs";
import { defaultSize } from '../../constants/ui';
const Product = ({ product }: { product: IProduct }) => {
  const images = product.image.split(";");
  return (
    <div className='text-center w-[250px] h-[340px] group  cursor-pointer mb-32'>
      <div className='relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-500 '>
        <img src={images[1]} alt='anh' className='w-full h-full object-contain 
        rounded-md absolute backface-hidden top-0 left-0 my-rotate-y-180' />
        <img src={images[0]} alt='anh' className='w-full h-full object-contain 
        rounded-md absolute top-0 left-0  backface-hidden' />
      </div>
      <div className='flex flex-col items-center w-full'>
        <p className='text-gray-500 text-center'>
          {product.title}
        </p>
        <div className='flex items-center w-[30%] justify-between my-1'>
          <h5 className='font-bold text-black '>
            {product.price}$
          </h5>
          <h5 className='text-gray-400 line-through'>
            15$
          </h5>
        </div>
        <button className='btnProduct relative flex items-center'>
          <p className='translate-x-0  transition duration-500 ease-linear group-hover:translate-x-[-120%]'>Buy Now</p>
          <BsCart size={defaultSize} className='absolute bottom-0 left-0 
          transition duration-500 ease-linear translate-x-[-100%] group-hover:translate-x-[130%] mb-1'/>
        </button>
      </div>
    </div>
  )
}

export default memo(Product)