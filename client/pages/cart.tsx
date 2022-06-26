import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Layout from '../components/Layout'
import { defaultSize } from '../services/ui'
import { ICartLocal } from '../redux/cartRedux/type'
import { LOCAL_CART } from '../services/cart'
const Cart = () => {

  const [carts, setCarts] = useState<ICartLocal[]>([])

  useEffect(() => {
    const data: ICartLocal[] = JSON.parse(localStorage.getItem(LOCAL_CART) as string);
    setCarts(data);
  }, [carts])

  return (
    <Layout>
      <div className='grid grid-cols-8 space-x-4 my-12  '>
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
        {
          carts.map((item, index) => (
            <div className='col-span-6 grid grid-cols-6 items-center' key={index}>
              <div className='flex items-center'>
                <img src={item.image} alt='anh' className='object-contain h-28' />
              </div>
              <div className='col-span-2'>
                <p>{item.title}</p>
              </div>
              <div className='col-span-1'>
                <p>{item.price * item.total}</p>
              </div>
              <div className='col-span-1 border-2 border-black flex items-center justify-between max-h-12 mr-8'>
                <AiOutlineMinus size={defaultSize} />
                <p>{item.total}</p>
                <AiOutlinePlus size={defaultSize} />
              </div>
              <div className='mt-2'>
                <AiOutlineDelete size={defaultSize} />
              </div>
            </div>
          ))
        }

      </div>
    </Layout>
  )
}

export default Cart