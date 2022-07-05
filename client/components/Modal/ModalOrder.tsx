import React, { useState } from 'react';
import { GoGistSecret, GoLocation, GoNote } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE_ORDER } from '../../config/constant';
import { IOrderRequest } from '../../redux/cartRedux/type';
import { hiddenModal } from '../../redux/commonRedux/actions';
import { IRootReducers } from '../../redux/rootReducer';
import { addDays, TODAY } from '../../utils';

const ModalOrder = ({
  productId,
  total,
}: {
  productId: string[];
  total: number;
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducers) => state.auth.user);
  const [message, setMessage] = useState<MESSAGE_ORDER>(
    MESSAGE_ORDER.MESSAGE_ORDER_OKE,
  );
  const todayEstimate = addDays(TODAY, 3)
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, '-');
  const [order, setOrder] = useState<IOrderRequest>({
    userName: '',
    note: '',
    address: '',
    productId,
    deliveryDate: todayEstimate,
    secret: '',
  });
  const handleChang = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === 'date') {
      if (e.currentTarget.value < TODAY) {
        setOrder({
          ...order,
          deliveryDate: todayEstimate,
        });
        setMessage(MESSAGE_ORDER.MESSAGE_ORDER_FAILURE);
        return;
      } else setMessage(MESSAGE_ORDER.MESSAGE_ORDER_OKE);
    }
    setOrder({
      ...order,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div
      className="py-6 transition duration-150 ease-in-out z-10 w-full h-full md:h-auto shadow dark:bg-gray-700"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="w-full flex justify-start text-gray-600 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-wallet"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
              <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
            </svg>
          </div>
          <h2 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Enter Billing Details
          </h2>
          <div className="flex items-center justify-between">
            <h5>Total: {total}</h5>
            <h5>You have select {productId?.length} products</h5>
          </div>
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Owner Name
          </label>
          <input
            id="name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            value={order?.userName ? order.userName : user?.username}
            name="name"
            onChange={handleChang}
          />
          <label
            htmlFor="address"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Address
          </label>
          <div className="relative mb-5 mt-2">
            <div className="absolute top-0 bottom-0 right-0 my-2.5 mx-3.5">
              <GoLocation size={'1.175rem'} />
            </div>
            <input
              id="address"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              value={order?.address}
              name="address"
              onChange={handleChang}
              placeholder="Your current address"
            />
          </div>
          <label
            htmlFor="deliveryDate"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Delivery Date
          </label>
          <div className="relative mb-5 mt-2">
            <input
              id="deliveryDate"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              type={'date'}
              name="deliveryDate"
              value={order.deliveryDate}
              onChange={handleChang}
            />
            <p
              className={`text-sm text-${
                message === MESSAGE_ORDER.MESSAGE_ORDER_OKE ? 'green' : 'red'
              }-600 pl-1`}
            >
              {message}
            </p>
          </div>
          <label
            htmlFor="secret"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Secret
          </label>
          <div className="relative mb-5 mt-2">
            <div className="absolute top-0 bottom-0 right-0 my-2.5 mx-3.5">
              <GoGistSecret size={'1.175rem'} />
            </div>
            <input
              id="secret"
              className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Take Note"
              name="secret"
              onChange={handleChang}
            />
            <p className="text-sm text-violet-600">
              Secret for to payment with shipper
            </p>
          </div>
          <label
            htmlFor="note"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Note
          </label>
          <div className="relative mb-5 mt-2">
            <div className="absolute top-0 bottom-0 right-0 my-2.5 mx-3.5">
              <GoNote size={'1.175rem'} />
            </div>
            <input
              id="note"
              className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Take Note"
              name="note"
              onChange={handleChang}
            />
          </div>
          <div className="flex items-center justify-start w-full">
            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
              Submit
            </button>
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={() => {
                dispatch(hiddenModal());
              }}
            >
              Cancel
            </button>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={() => {
              dispatch(hiddenModal());
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrder;
