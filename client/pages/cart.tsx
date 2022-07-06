import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import ModalNoSelect from '../components/Modal/ModalNoSelect';
import ModalOrder from '../components/Modal/ModalOrder';
import { deleteCart, getCarts, updateCart } from '../redux/cartRedux/action';
import { showOrderProduct } from '../redux/commonRedux/actions';
import { IRootReducers } from '../redux/rootReducer';
import { defaultSize } from '../services/ui';

const Cart = () => {
  const carts = useSelector((state: IRootReducers) => state.cart.carts);
  const user = useSelector((state: IRootReducers) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarts());
  }, []);
  const handleNumber = (id: string, value: number) => {
    dispatch(updateCart({ id, value }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCart({ id }));
  };
  const handleOrder = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    const array: string[] = [];
    var checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type=checkbox]:checked',
    );
    checkboxes.forEach((item) => {
      array.push(item?.value);
    });
    const total: string[] = [];
    carts.forEach((item) => {
      if (array.find((c) => c == item.productId)) total.push(`${item.total}`);
    });
    dispatch(
      showOrderProduct(
        array.length > 0 ? (
          <ModalOrder productId={array} total={total} />
        ) : (
          <ModalNoSelect />
        ),
      ),
    );
  };

  return (
    <Layout>
      <div className="grid grid-cols-8 space-x-4 my-12 xl:h-[60h] h-[50vh]">
        <div className="col-span-2 shadow-lg rounded-sm py-12 px-10 xl:h-[70%] h-[60%]">
          <h5 className="text-normal">
            You are having {carts?.length ? carts.length : 0} item in cart
          </h5>
          <div className="flex items-center justify-between">
            <h5 className="">Total:</h5>
            <h4 className="text-primary font-bold">
              {carts.reduce((pre, curr) => {
                return pre + curr?.total * curr?.price;
              }, 0)}
            </h4>
          </div>
          <div className="flex flex-col items-stretch justify-between">
            <button
              className="btn my-4 bg-primary text-white shadow-sm"
              onClick={() => {
                handleOrder();
              }}
            >
              Order
            </button>
            <Link href={'/product'}>
              <button className="btn bg-primary text-white shadow-sm">
                Continue for shopping
              </button>
            </Link>
          </div>
        </div>
        <div className="col-span-6">
          {carts.map((item, index) => (
            <div
              className=" grid grid-cols-6 items-center space-y-6"
              key={index}
            >
              <div className="flex items-center justify-between">
                <input
                  className="form-check-input appearance-none 
                h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top
                bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type={'checkbox'}
                  name="selectProduct"
                  value={item.productId}
                />
                <img
                  src={item.image}
                  alt="anh"
                  className="object-contain h-28 my-2 mx-auto"
                />
              </div>
              <div className="col-span-2">
                <h5>{item.title}</h5>
              </div>
              <div className="col-span-1">
                <p>{item.price * item.total}</p>
              </div>
              <div className="col-span-1 border-2 border-black flex items-center justify-between max-h-12 mr-8 cursor-pointer">
                <AiOutlineMinus
                  size={defaultSize}
                  onClick={() => {
                    if (item.total !== 1) handleNumber(item.productId, -1);
                  }}
                />
                <p>{item.total}</p>
                <AiOutlinePlus
                  size={defaultSize}
                  onClick={() => {
                    handleNumber(item.productId, 1);
                  }}
                />
              </div>
              <div className="mt-2 cursor-pointer">
                <AiOutlineDelete
                  size={defaultSize}
                  onClick={handleDelete.bind(this, item.productId)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
