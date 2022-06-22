import React from 'react'
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Layout from '../components/Layout'
import { defaultSize } from '../constants/ui'

const Cart = () => {
  return (
    <Layout>
      <div className='grid grid-cols-8 space-x-4 '>
        <div className='col-span-2 shadow-lg rounded-sm py-12 px-10'>
          <h5 className='text-normal'>You are having 1 item in cart</h5>
          <div className='flex items-center justify-between'>
            <h5 className=''>Total:</h5>
            <h4 className='text-primary font-bold'>189</h4>
          </div>
          <div className='flex flex-col items-stretch justify-between '>
            <button className='btn my-4 bg-primary text-white shadow-sm'>
              Order
            </button>
            <button className='btn bg-primary text-white shadow-sm'>
              Continue for shopping
            </button>
          </div>
        </div>
        <div className='col-span-6 grid grid-cols-6 my-auto' >
          <div className='flex items-center'>
            <img src={'https://res.cloudinary.com/the-roap-trip/image/upload/v1655453831/b52l4mz4yiljmcsg7qom.jpg'} alt='anh' className='object-contain h-28' />
          </div>
          <div className='col-span-2'>
            <p>Áo Thun Dinosaur 01 - white - s</p>
          </div>
          <div className='col-span-1'>
            <p>189,000</p>
          </div>
          <div className='col-span-1 border-2 border-black flex items-center justify-between max-h-12 mr-8'>
            <AiOutlineMinus size={defaultSize} />
            <p>1</p>
            <AiOutlinePlus size={defaultSize} />
          </div>
          <div className='mt-2'>
            <AiOutlineDelete size={defaultSize} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart