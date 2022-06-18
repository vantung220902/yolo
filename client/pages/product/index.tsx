import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getProductFromCategory, loadMore } from '../../actions/product'
import { getCategoriesApi } from '../../api/categoryApi'
import { getProducts } from '../../api/productApi'
import Layout from '../../components/Layout'
import Product from '../../components/Product'
import { listColor, listSize } from '../../constants'
import { defaultSize } from '../../constants/ui'
import { ResponseListCategory } from '../../types/Category'
import { ResponseListProduct } from '../../types/Product'
import { IRootReducers } from '../../types/typeReducers'

const Category = ({ products, categories }: { products: ResponseListProduct, categories: ResponseListCategory }) => {
  const data = useSelector((state: IRootReducers) => state.product);
  const dispatch = useDispatch();
  //state for filter
  const [filter, setFilter] = useState(0);
  const [idFilter, setIdFilter] = useState(0);
 //limit for number product return
  const [limit, setLimit] = useState(6);
  //dispatch action to redux and redux-saga
  const dispatchLoadMore = () => dispatch(loadMore({ limit, cursor: data.products.length > 1 ? data.cursor : products.cursor }))
  const dispatchGetProductFromCategory = (id: number) => dispatch(getProductFromCategory({ limit, id, cursor: data.products.length > 1 ? data.cursor : undefined }))

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 650 || document.documentElement.scrollTop > 650 && data.hasMore) {
        switch (filter) {
          case 0:
            dispatchLoadMore();
            setFilter(0);
            break;
          case 1:
            dispatchGetProductFromCategory(idFilter)
            break;
        }

        setLimit(pre => {
          return pre + 3;
        })
      }
    };
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [filter])


  const filterCategory = (id: number) => {
    if (id !== 0) {
      dispatchGetProductFromCategory(id);
      setFilter(1);
      setIdFilter(id);
    } else {
      setFilter(0);
    }
  }
  return (
    <Layout>
      <div className='flex justify-between '>
        <div className='w-[30%]'>
          <div className='my-2'>
            <h5 className='font-bold text-black'>List Categories</h5>
            <ul>
              <li className='flex items-center mb-1'>
                <input className="form-check-input appearance-none 
                h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top
                bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name='checkCategory'
                  onClick={() => {
                    filterCategory(0);
                  }} />
                <p className='text-[#C0C6C8] font-medium'>All</p>
              </li>
              {categories.categories.map(item => {
                return (<li className='flex items-center mb-1' key={item.id}>
                  <input className="form-check-input appearance-none 
                h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top
                bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name='checkCategory'
                    onClick={() => {
                      filterCategory(parseInt(item.id, 10));
                    }}
                  />
                  <p className='text-[#C0C6C8] font-medium'>{item.title}</p>
                </li>)
              })}
            </ul>
          </div>
          <div className='my-2'>
            <h5 className='font-bold text-black'>Color</h5>
            <ul>
              <li className='flex items-center mb-1'>
                <input className="form-check-input appearance-none 
                h-4 w-4 border border-gray-300 rounded-sm bg-white
                 checked:bg-blue-600 checked:border-blue-600 focus:outline-none
                 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain
                 float-left mr-2 cursor-pointer" type="radio" name='checkColor' />
                <p className='text-[#C0C6C8] font-medium'>All</p>
              </li>
              {listColor.map((item, index) => {
                return (<li className='flex items-center mb-1' key={index}>
                  <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 
                  rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none
                  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2
                  cursor-pointer" type="radio" name='checkColor' />
                  <p className='text-[#C0C6C8] font-medium'>{item}</p>
                </li>)
              })}
            </ul>
          </div>
          <div className='my-2'>
            <h5 className='font-bold text-black'>Size</h5>
            <ul>
              <li className='flex items-center mb-1'>
                <input className="form-check-input appearance-none 
                h-4 w-4 border border-gray-300 rounded-sm bg-white
                 checked:bg-blue-600 checked:border-blue-600 focus:outline-none
                 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain
                 float-left mr-2 cursor-pointer" type="radio" name='checkSize' />
                <p className='text-[#C0C6C8] font-medium'>All</p>
              </li>
              {listSize.map((item, index) => {
                return (<li className='flex items-center mb-1' key={index}>
                  <input className="form-check-input appearance-none h-4 w-4 border
                   border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600
                   focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain
                    float-left mr-2 cursor-pointer" type="radio" name='checkSize' />
                  <p className='text-[#C0C6C8] font-medium'>{item.toUpperCase()}</p>
                </li>)
              })}
            </ul>
          </div>
          <button className='btn mt-4'>
            Delete Filter
          </button>
        </div>
        <div className='grid grid-cols-3 gap-12 w-[70%] mr-28'>
          {filter === 0 ? products.products?.map(item => {
            return <Product product={item} key={item.id} />
          }) : null}
          {data.products.map(item => {
            return <Product product={item} key={item.id} />
          })}
        </div>
      </div>
      {!data.hasMore ? <div className="flex mx-auto items-center bg-primary
       text-white text-sm font-bold px-4 py-3 w-[280px]" role="alert">
        <BsFillEmojiLaughingFill size={defaultSize} className='mr-1' />
        <p>Those are whole our products</p>
      </div> : null}
    </Layout>

  )
}
export const getStaticProps = async () => {
  const products: AxiosResponse<ResponseListProduct, ResponseListProduct> = await getProducts(6);
  const categories: AxiosResponse<ResponseListCategory, ResponseListCategory> = await getCategoriesApi();
  return {
    props: {
      products: products.data,
      categories: categories.data
    }
  }
}
export default Category
