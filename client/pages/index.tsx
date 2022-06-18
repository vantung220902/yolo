import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { AiFillCreditCard, AiOutlineHeart, AiOutlineShopping, AiOutlineStar } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { loadMore } from '../actions/product'
import { getProducts } from '../api/productApi'
import Layout from '../components/Layout'
import Policy from '../components/Policy'
import Product from '../components/Product'
import Slider from '../components/Slider'
import { ResponseListProduct } from '../types/Product'
import { IRootReducers } from '../types/typeReducers'
import banner from '../assets/banner.png'
export const policiesData = [
  {
    title: "Free Shipping",
    description: "Free Shipping with order more 239k",
    icon: <AiOutlineShopping size={'2.5rem'} className='text-primary' />,
  },
  {
    title: "Pay with COD",
    description: "Payment on delivery",
    icon: <AiFillCreditCard size={'2.5rem'} className='text-primary' />,
  },
  {
    title: "Vip Customer",
    description: "Offers for vip customer",
    icon: <AiOutlineStar size={'2.5rem'} className='text-primary' />,
  },
  {
    title: "Warranty policy",
    description: "Chang, modify at the store",
    icon: <AiOutlineHeart size={'2.5rem'} className='text-primary' />,
  }
]
const Home = ({ products }: { products: ResponseListProduct }) => {
  const data = useSelector((state: IRootReducers) => state.product);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(8);
  const dispatchLoadMore = () => dispatch(loadMore({ limit, cursor: data.products.length > 1 ? data.cursor : products.cursor }))
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700 && data.hasMore && limit <=12) {
        dispatchLoadMore()
        setLimit(pre => {
          return pre + 4;
        })
      }
    })
  }, [])
  return (
    <Layout>
      <Slider />
      <div className='grid grid-cols-4 mx-auto'>
        {policiesData.map((item, index) => {
          return <Policy item={item} key={index} />
        })}
      </div>
      <main className='mt-24 flex flex-col items-stretch '>
        <h3 className='text-center mb-12'>Rank Product Best Seller In This Week</h3>
        <div className='grid grid-cols-4 gap-4 mt-8'>
          {products.products?.map(item => {
            return <Product product={item} key={item.id} />
          })}
          {data.products.map(item => {
            return <Product product={item} key={item.id} />
          })}
        </div>
        <img src={banner.src} alt="banner" className='w-full h-full ' />
      </main>
    </Layout>
  )
}


export const getStaticProps = async () => {
  const products: AxiosResponse<ResponseListProduct, ResponseListProduct> = await getProducts(4);
  return {
    props: {
      products: products.data
    }
  }
}

export default Home
