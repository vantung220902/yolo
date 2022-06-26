import { useEffect } from 'react'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Product from '../../components/Product'
import { ResponseListCategory } from '../../redux/categoryRedux/type'
import { loadMoreAsync } from '../../redux/productRedux/actions'
import { IRootReducers } from '../../redux/rootReducer'
import { API } from '../../services'
import { listColor, listSize } from '../../services/localData'
import { defaultSize } from '../../services/ui'

const { getCategories } = API.create();

const Category = ({ categories }: { categories: ResponseListCategory }) => {
  const data = useSelector((state: IRootReducers) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const height = screen.height;
    const handleScroll = () => {
      if (document.body.scrollTop > (height / 3) + 50 || document.documentElement.scrollTop > (height / 3) + 50 && data.hasMore) {
        dispatch(loadMoreAsync.request({
          limit: 6, cursor: data.products.length > 1
            ? data.cursor : undefined
        }))
      }
    };
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [data])
  useEffect(() => {
    if (data.products.length === 0) {
      dispatch(loadMoreAsync.request({
        limit: 6, cursor: undefined
      }))
    }
  }, [])

  const clearFilter = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type=radio]')
    inputs.forEach(el => {
      el.checked = false
    })
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

                  }} />
                <p className='text-[#C0C6C8] font-medium'>All</p>
              </li>
              {categories?.categories.map((item, index) => {
                return (<li className='flex items-center mb-1' key={item.id}>
                  <input className="form-check-input appearance-none 
                h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top
                bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name='checkCategory'
                    onClick={() => {

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
                 float-left mr-2 cursor-pointer" type="radio" name='checkColor' onClick={() => {

                  }} />
                <p className='text-[#C0C6C8] font-medium' >All</p>
              </li>
              {listColor.map((item, index) => {
                return (<li className='flex items-center mb-1' key={index}>
                  <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 
                  rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none
                  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2
                  cursor-pointer" type="radio" name='checkColor' onClick={() => {

                    }} />
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
          <button className='btn mt-4' onClick={clearFilter}>
            Delete Filter
          </button>
        </div>
        <div className='grid grid-cols-3 gap-12 w-[70%] mr-28'>
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
  const categories = await getCategories();
  return {
    props: {
      categories: categories.data,
    }
  }
}
export default Category
