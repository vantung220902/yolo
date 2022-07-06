import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch, AiOutlineShopping } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/Logo.png';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import useToken from '../../hooks/useToken';
import { getMeAsync } from '../../redux/authRedux/actions';
import { IMe } from '../../redux/authRedux/type';
import { setActiveSearch } from '../../redux/commonRedux/actions';
import { loadMoreAsync } from '../../redux/productRedux/actions';
import { IRootReducers } from '../../redux/rootReducer';
import { defaultSize, titleNav } from '../../services/ui';
import Dropdown from './DropDown';

const Navbar = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const [data, setData] = useState<IMe | undefined>();
  const [qSearch, setQSearch] = useState('');
  const auth = useSelector((state: IRootReducers) => state.auth);
  const navRef = useRef<HTMLDivElement>(null);
  const carts = useSelector((state: IRootReducers) => state.cart.carts);
  const isActiveSearch = useSelector(
    (state: IRootReducers) => state.common.isActiveSearch,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const checkData = async () => {
      const check = useToken.getToken();
      if (check) {
        const fetchData = await useCheckAuth(router);
        const accessToken = useToken.getToken();
        if (accessToken && fetchData) {
          setData(fetchData);
          dispatch(getMeAsync.success(fetchData));
        }
      } else setData(undefined);
    };
    checkData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        navRef.current?.classList.add('navShow');
      } else {
        navRef.current?.classList.remove('navShow');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQSearch(event.currentTarget.value);
    dispatch(
      loadMoreAsync.request({
        limit: 6,
        cursor: undefined,
        q: event.currentTarget.value,
        isSearch: true,
      }),
    );
  };

  return (
    <div
      className="px-12 py-4 fixed top-0 left-0 grid grid-cols-3 bg-white transition-all duration-200 ease-in w-[100%]"
      ref={navRef}
    >
      <div className="flex items-center">
        {titleNav.map((item, index) => (
          <Link href={item.link} key={index}>
            <h4
              className={`px-4 ${
                active === index
                  ? 'text-primary font-bold'
                  : 'text-normal font-medium hover:text-primary/90'
              }`}
              onClick={() => {
                setActive(index);
              }}
            >
              {item.title}
            </h4>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={Logo}
          alt="anh"
          width={120}
          height={60}
          objectFit="contain"
        />
      </div>
      <div
        className={`flex items-center justify-between w-[${
          isActiveSearch ? '60%' : '50%'
        }] ml-auto z-10`}
      >
        <div className="mr-2 flex items-center">
          {isActiveSearch && (
            <input
              name="name"
              placeholder="Search..."
              value={qSearch}
              onChange={handleChange}
              className="py-2 border-t-0 border-r-0 border-l-0 border-b-2 
            focus:border-blue-600  focus:outline-none focus:shadow-none"
            />
          )}
          <AiOutlineSearch
            size={defaultSize}
            className="icon"
            onClick={() => dispatch(setActiveSearch(!isActiveSearch))}
          />
        </div>
        <Link href={'/cart'}>
          <div className="relative">
            <AiOutlineShopping size={defaultSize} className="icon" />
            <div className="absolute top-[18%] left-[37%] cursor-pointer">
              {carts?.length}
            </div>
          </div>
        </Link>
        {auth?.user || data ? (
          <Dropdown user={auth?.user || data} />
        ) : (
          <button className="btn mr-3">
            <Link href={'/auth/login'}>Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
