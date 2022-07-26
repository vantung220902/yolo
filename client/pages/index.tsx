import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { AiFillCreditCard, AiOutlineHeart, AiOutlineShopping, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { IProductReducer } from 'redux/productRedux/reducer';
import { ResponseListProduct } from 'redux/productRedux/type';
import banner from '../assets/banner.png';
import Layout from '../components/Layout';
import Policy from '../components/Policy';
import Product from '../components/Product';
import Slider from '../components/Slider';
import { loadMoreAsync } from '../redux/productRedux/actions';
import { IRootReducers } from '../redux/rootReducer';
export const policiesData = [
  {
    title: 'Free Shipping',
    description: 'Free Shipping with order more 239k',
    icon: <AiOutlineShopping size={'2.5rem'} className="text-primary" />,
  },
  {
    title: 'Pay with COD',
    description: 'Payment on delivery',
    icon: <AiFillCreditCard size={'2.5rem'} className="text-primary" />,
  },
  {
    title: 'Vip Customer',
    description: 'Offers for vip customer',
    icon: <AiOutlineStar size={'2.5rem'} className="text-primary" />,
  },
  {
    title: 'Warranty policy',
    description: 'Chang, modify at the store',
    icon: <AiOutlineHeart size={'2.5rem'} className="text-primary" />,
  },
];

const Home = ({ products }: { products: ResponseListProduct }) => {
  const product = useSelector((state: IRootReducers) => state.product);
  const dispatch = useDispatch();
  const handleLoadMore = (arg: IProductReducer) => {
    const height = screen.height;
    if (arg.hasMore && (document.documentElement.scrollTop > height / 3 || document.body.scrollTop > height / 3)) {
      dispatch(
        loadMoreAsync.request({
          limit: 4,
          cursor: arg.cursor,
          q: '',
          isSearch: false,
        }),
      );
    }
  };

  const debounceLoadMore = useRef(debounce((product) => handleLoadMore(product), 700)).current;
  useEffect(() => {
    window.addEventListener('scroll', debounceLoadMore.bind(null, product.products.length > 0 ? product : products));
    return () => window.removeEventListener('scroll', debounceLoadMore);
  }, [product]);
  return (
    <Layout>
      <Slider />
      <div className="grid grid-cols-4 mx-auto">
        {policiesData.map((item, index) => {
          return <Policy item={item} key={index} />;
        })}
      </div>
      <main className="mt-24 flex flex-col items-stretch ">
        <h3 className="text-center mb-12">Rank Product Best Seller In This Week</h3>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {products?.products?.map((item) => {
            return <Product product={item} key={item.id} />;
          })}
          {product.products?.map((item) => {
            return <Product product={item} key={item.id} />;
          })}
        </div>
        <img src={banner.src} alt="banner" className="w-full h-full " />
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const response = await axios.get('http://localhost:4000/api/product/gets?limit=4&q=');
  return {
    props: {
      products: response.data,
    },
  };
};

export default Home;
