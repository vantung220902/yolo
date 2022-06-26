import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { getProductByIdAsync } from '../../redux/productRedux/actions'
import { ResponseProduct } from '../../redux/productRedux/type'
import { IRootReducers } from '../../redux/rootReducer'
import { API } from '../../services'
import { listSize } from '../../services/localData'
import { defaultSize } from '../../services/ui'

const { getProductIds, getProductById } = API.create();

const ProductPage = ({ product }: { product: string | ResponseProduct }) => {
  const [number, setNumber] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [checkDescription, setCheckDescription] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setSize] = useState(0);
  const [imgShow, setImgShow] = useState(0);
  //redux
  const data = useSelector((state: IRootReducers) => state.product.product);
  const dispatch = useDispatch();
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  useEffect(() => {
    if (typeof product === 'string') {
      const productParse: ResponseGenerator = JSON.parse(product);
      dispatch(getProductByIdAsync.success(productParse.data.product));
      const tmpImages = [];
      const listImage = productParse.data.product?.image.split(';');
      for (let i = 0; i < listImage.length - 1; i++) {
        tmpImages.push(listImage[i]);
      }
      setImages(tmpImages);
    } else if (!isNaN(id)) {
      dispatch(getProductByIdAsync.request({ id }));
    }
  }, [id])
  if (!data) return (<div className="flex items-center justify-center ">
    <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
  </div>)
  return (
    <Layout>
      <div className='grid grid-cols-10 gap-4 h-screen overflow-scroll scrollbar-hide'>
        <div className='col-span-6 grid grid-cols-6 overflow-y-scroll max-h-[800px] scrollbar-hide'>
          <div className='col-span-2'>
            <ul className='cursor-pointer'>
              {images?.map((image, index) => <li key={index} onClick={() => {
                setImgShow(index);
              }}>
                <img src={image} alt='anh' className='w-[180px] h-[250px] object-contain' />
              </li>)}
            </ul>
          </div>
          <div className='col-span-4'>
            <img src={images && images[imgShow]} className='w-full h-screen object-contain' />
          </div>
          <div className='col-span-6 relative'>
            <h5 className='mb-4 text-black font-bold'>Description Product</h5>
            <p className='my-2 text-justify'>{checkDescription ? data?.description : data?.description.slice(0, 350)}</p>
            <button className='absolute top-[86%] left-[50%] btn w-40 h-12 bg-primary' onClick={() => {
              setCheckDescription(pre => {
                return !pre;
              })
            }}>
              {checkDescription ? "Watch More" : "Collapse"}
            </button>
          </div>
        </div>
        <div className='col-span-3 ml-8'>
          <h3 className='my-4 text-black font-medium'>{data?.title}</h3>
          <h3 className='my-4 text-primary'>{data?.price}</h3>
          <h4 className='text-black font-medium'>Color</h4>
          <div className='flex items-center my-4'>
            <div className={`w-[50px] h-[50px] rounded-full border-2 ${activeColor === 0 ? 'border-gray-500' : 'border-white'} bg-red-600 mr-2
               `} onClick={() => { setActiveColor(0) }}></div>
            <div className={`w-[50px] h-[50px] rounded-full border-2 ${activeColor === 1 ? 'border-gray-500' : 'border-white'} bg-yellow-600 mr-2
               `} onClick={() => { setActiveColor(1) }}></div>
            <div className={`w-[50px] h-[50px] rounded-full border-2 ${activeColor === 2 ? 'border-gray-500' : 'border-white'} bg-blue-600 mr-2
               `} onClick={() => { setActiveColor(2) }}></div>

          </div>
          <h4 className='text-black font-medium'>Size</h4>
          <div className='flex items-center my-4'>
            {listSize.map((item, index) => (
              <div key={index} className={`w-[50px] h-[50px] rounded-full border-2 ${activeSize === index ? 'border-cyan-500' : 'border-gray-100'} flex items-center justify-center mr-2 `}
                onClick={() => {
                  setSize(index)
                }}
              >{item.toUpperCase()}</div>
            ))}

          </div>
          <h4 className='text-black font-medium'>Number</h4>
          <div className='flex items-center my-4 cursor-pointer'>
            <AiOutlinePlus size={defaultSize} onClick={() => {
              setNumber(pre => pre + 1)
            }} />
            <input
              type="number"
              className="form-control block w-[100px] px-3 py-1.5 text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        mx-2
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      " value={number} onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setNumber(value !== 0 ? value : 1)
              }} />
            <AiOutlineMinus size={defaultSize} onClick={() => {
              if (number !== 1)
                setNumber(pre => {
                  if (pre === 1) {
                    return 1;
                  }
                  return pre - 1;
                })
            }} />
          </div>
          <div className='flex items-center mt-1'>
            <button className='btn mr-3'>
              Add to cart
            </button>
            <button className='btn '>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const getStaticPaths = async () => {
  const paths = await getProductIds();
  return {
    paths,
    fallback: true
  };
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const data = await getProductById(params.id);
  const product = await JSON.stringify(data, getCircularReplacer())
  return {
    props: {
      product,
    },
    revalidate: 1
  }
}

export default ProductPage