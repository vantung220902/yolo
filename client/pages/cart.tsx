import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import ModalNoSelect from '../components/Modal/ModalNoSelect';
import ModalOrder from '../components/Modal/ModalOrder';
import { ICartLocal } from '../redux/cartRedux/type';
import { showOrderProduct } from '../redux/commonRedux/actions';
import { IRootReducers } from '../redux/rootReducer';
import { LOCAL_CART } from '../services/cart';
import { defaultSize } from '../services/ui';
const Cart: React.FC<Props> = ({ onShowModel }) => {
  const [carts, setCarts] = useState<ICartLocal[]>([]);

  useEffect(() => {
    const data: ICartLocal[] = localStorage.getItem(LOCAL_CART)
      ? JSON.parse(localStorage.getItem(LOCAL_CART) as string)
      : [];
    setCarts(data);
  }, []);
  const handleNumber = (id: string, value: number) => {
    const index = carts.findIndex((item) => item.productId == id);
    const newObj = {
      ...carts[index],
      total: (carts[index]?.total as number) + value,
    };
    setCarts((pre) => {
      pre[index] = newObj;
      return [...pre];
    });
    localStorage.setItem(LOCAL_CART, JSON.stringify(carts));
  };

  const handleDelete = (id: string) => {
    const array = carts.filter((item) => item.productId != id);
    setCarts(array);
    localStorage.setItem(LOCAL_CART, JSON.stringify(array));
  };
  const handleOrder = () => {
    const array: string[] = [];
    var checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type=checkbox]:checked',
    );
    checkboxes.forEach((item) => {
      array.push(item?.value);
    });
    const total = array.reduce((pre, e) => {
      return (carts.find((item) => item.productId == e)?.total as number) + pre;
    }, 0);
    onShowModel(
      array.length > 0 ? (
        <ModalOrder productId={array} total={total} />
      ) : (
        <ModalNoSelect />
      ),
    );
  };

  return (
    <Layout>
      <div className="grid grid-cols-8 space-x-4 my-12 xl:h-[60h] h-[50vh]">
        <div className="col-span-2 shadow-lg rounded-sm py-12 px-10 xl:h-[70%] h-[60%]">
          <h5 className="text-normal">You are having 1 item in cart</h5>
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
              className=" grid grid-cols-5 items-center space-y-6"
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
              <div className="col-span-1 ">
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

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootReducers) => ({});

const mapDispatchToProps = {
  onShowModel: showOrderProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
