import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch, AiOutlineShopping } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import Logo from '../../assets/Logo.png'
import { defaultSize, titleNav } from '../../services/ui'
import { IMe } from '../../redux/authRedux/type'
import { IRootReducers } from '../../redux/rootReducer'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import useToken from '../../hooks/useToken'
import Dropdown from './DropDown'

const Navbar = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const [data, setData] = useState<IMe | undefined>()
  const auth = useSelector((state: IRootReducers) => state.auth);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkData = async () => {
      const check = await useToken.getRefreshToken();
      if (check) {
        const fetchData = await useCheckAuth(router);
        const accessToken = useToken.getToken();
        if (accessToken && fetchData)
          setData(fetchData)
      } else setData(undefined);
    }
    checkData();
  }, [auth]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        navRef.current?.classList.add('navShow')
      } else {
        navRef.current?.classList.remove('navShow')
      }
    })
  },[])

  return (
    <div className='px-8 py-4 fixed top-0 left-0 right-0 grid grid-cols-3 bg-white transition-all duration-200 ease-in' ref={navRef}>
      <div className='flex items-center'>
        {titleNav.map((item, index) => (<Link href={item.link} key={index}>
          <h4 
            className={`px-4 ${active === index ?
              'text-primary font-bold' : 'text-normal font-medium hover:text-primary/90'}`}
            onClick={() => {
              setActive(index)
            }}
          >
            {item.title}
          </h4>
        </Link>))}
      </div>
      <div className='flex items-center justify-center'>
        <Image src={Logo} alt='anh' width={120} height={60} objectFit='contain' />
      </div>
      <div className='flex items-center justify-between w-[50%] ml-auto'>
        <div className='mr-2'>
          <AiOutlineSearch size={defaultSize} className='icon' />
        </div>
        <div className='relative'>
          <AiOutlineShopping size={defaultSize} className='icon' />
          <div className='absolute top-[18%] left-[37%] cursor-pointer'>
            0
          </div>
        </div>
        {auth?.user || data ? <Dropdown user={auth?.user || data} /> : <button className="btn mr-3">
          <Link href={'/auth/login'}>
            Login
          </Link>
        </button>}

      </div>
    </div>
  )
}
export default Navbar;
