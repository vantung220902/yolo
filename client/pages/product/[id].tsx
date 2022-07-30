import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/cartRedux/action';
import Layout from '../../components/Layout';
import { ICartLocal } from '../../redux/cartRedux/type';
import { IProduct, ResponseListProduct, ResponseProduct } from '../../redux/productRedux/type';
import { listColor2, listSize } from '../../services/localData';
import { defaultSize } from '../../services/ui';

const ProductPage = ({ product }: { product: IProduct }) => {
  const [number, setNumber] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [checkDescription, setCheckDescription] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setSize] = useState(0);
  const [imgShow, setImgShow] = useState(0);
  //redux
  const dispatch = useDispatch();
  useEffect(() => {
    const tmpImages = [];
    const listImage = product && product.image.split(';');
    for (let i = 0; i < listImage?.length - 1; i++) {
      tmpImages.push(listImage[i]);
    }
    setImages(tmpImages);
  }, [product]);

  const handleAddCart = () => {
    const cart: ICartLocal = {
      productId: product.id,
      image: images[0],
      title: ` ${product.title} - ${listSize[activeSize]} - ${listColor2[activeColor]}`,
      price: product.price,
      total: number,
    };
    dispatch(addCart(cart));
  };

  return (
    <Layout>
      <div className="grid grid-cols-10 gap-4 h-full overflow-scroll scrollbar-hide">
        <div className="col-span-6 grid grid-cols-6 overflow-y-scroll max-h-[900px] scrollbar-hide">
          <div className="col-span-2">
            <ul className="cursor-pointer">
              {images?.map((image, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setImgShow(index);
                  }}
                >
                  <img src={image} alt="anh" className="w-[180px] h-[250px] object-contain" />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4">
            <img src={images && images[imgShow]} className="w-full h-screen object-contain" />
          </div>
          <div className="col-span-6 relative">
            <h5 className="mb-4 text-black font-bold">Description Product</h5>
            <p className="my-2 text-justify">
              {checkDescription ? product?.description : product?.description.slice(0, 350)}
            </p>
            <button
              className="absolute top-[86%] left-[50%] btn w-40 h-12 bg-primary"
              onClick={() => {
                setCheckDescription((pre) => {
                  return !pre;
                });
              }}
            >
              {checkDescription ? 'Watch More' : 'Collapse'}
            </button>
          </div>
        </div>
        <div className="col-span-3 ml-8">
          <h3 className="my-4 text-black font-medium">{product?.title}</h3>
          <h3 className="my-4 text-primary">{product?.price}</h3>
          <h4 className="text-black font-medium">Color</h4>
          <div className="flex items-center my-4">
            <div
              className={`w-[50px] h-[50px] rounded-full border-2 ${
                activeColor === 0 ? 'border-gray-500' : 'border-white'
              } bg-red-600 mr-2
               `}
              onClick={() => {
                setActiveColor(0);
              }}
            ></div>
            <div
              className={`w-[50px] h-[50px] rounded-full border-2 ${
                activeColor === 1 ? 'border-gray-500' : 'border-white'
              } bg-yellow-600 mr-2
               `}
              onClick={() => {
                setActiveColor(1);
              }}
            ></div>
            <div
              className={`w-[50px] h-[50px] rounded-full border-2 ${
                activeColor === 2 ? 'border-gray-500' : 'border-white'
              } bg-blue-600 mr-2
               `}
              onClick={() => {
                setActiveColor(2);
              }}
            ></div>
          </div>
          <h4 className="text-black font-medium">Size</h4>
          <div className="flex items-center my-4">
            {listSize.map((item, index) => (
              <div
                key={index}
                className={`w-[50px] h-[50px] rounded-full border-2 ${
                  activeSize === index ? 'border-cyan-500' : 'border-gray-100'
                } flex items-center justify-center mr-2 `}
                onClick={() => {
                  setSize(index);
                }}
              >
                {item.toUpperCase()}
              </div>
            ))}
          </div>
          <h4 className="text-black font-medium">Number</h4>
          <div className="flex items-center my-4 cursor-pointer">
            <AiOutlinePlus
              size={defaultSize}
              onClick={() => {
                setNumber((pre) => pre + 1);
              }}
            />
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
      "
              value={number}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setNumber(value !== 0 ? value : 1);
              }}
            />
            <AiOutlineMinus
              size={defaultSize}
              onClick={() => {
                if (number !== 1)
                  setNumber((pre) => {
                    if (pre === 1) {
                      return 1;
                    }
                    return pre - 1;
                  });
              }}
            />
          </div>
          <div className="flex items-center mt-1">
            <button className="btn mr-3" onClick={handleAddCart}>
              Add to cart
            </button>
            <button className="btn ">Buy Now</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const response: AxiosResponse<ResponseListProduct, any> = await axios.get(
    process.env.NODE_ENV === 'production'
      ? 'https://stormy-beach-03479.herokuapp.com/api/product/gets?limit=4&q='
      : 'http://localhost:4000/api/product/gets?limit=4&q=',
    {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 0,
        Accept: 'application/json',
      },
    },
  );
  const paths = response.data?.products?.map((item) => ({
    params: {
      id: `${item.id}`,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const {
    data: { product },
  }: AxiosResponse<ResponseProduct, any> = await axios.get(
    process.env.NODE_ENV === 'production'
      ? `https://stormy-beach-03479.herokuapp.com/api/product/getById?id=${params.id}`
      : `http://localhost:4000/api/product/getById?id=${params.id}`,
  );
  return {
    props: {
      product,
    },
    revalidate: 1,
  };
};

export default ProductPage;
