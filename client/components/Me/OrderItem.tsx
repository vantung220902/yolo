import React from 'react';
import { IOrder } from 'redux/cartRedux/type';
import useCollapse from 'react-collapsed';
const OrderItem = ({ order }: { order: IOrder }) => {
  const { getCollapseProps, getToggleProps } = useCollapse();
  return (
    <div className="mb-4" id="accordionExample">
      <div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header mb-0" id="headingOne">
          <button
            {...getToggleProps()}
            className="
accordion-button
relative
flex
items-center
w-full
py-4
px-5
text-base text-gray-800 text-left
border-0
rounded-none
transition
focus:outline-none
bg-gray-100
"
            type="button"
          >
            {new Date(order?.createdAt).toLocaleString()}
          </button>
        </h2>
        <div {...getCollapseProps()}>
          <div className="accordion-body py-4 px-5">
            {order?.productOrder.map((value) => (
              <div
                className=" grid grid-cols-6 items-center space-y-6 border-b-black-100 border-b-2 border-x-[90%] py-2 border-gray-200"
                key={value.id}
              >
                <div className="flex items-center justify-between">
                  <img
                    src={value.products.image.split(';')[0]}
                    alt="anh"
                    className="object-contain h-28 my-2 mx-auto rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <h6 className="text-black/95 text-lg font-medium">{value.products.title}</h6>
                  <h6>{`Color: ${value.products.color}`}</h6>
                  <h6>{`Price: $${value.products.price}`}</h6>
                </div>
                <div className="col-span-1">
                  <h5>{`Quantity: ${value.quantity}`}</h5>
                </div>
                <div className="col-span-1">
                  <h5>{`Total: $${value.quantity * value.products.price + 0.5}`}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="flex item item-center justify-between mx-8">
            <div className="flex flex-col justify-between my-6">
              <h5>Shipping</h5>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHTK-Slogan.png"
                    alt="logo"
                    className="object-contain h-20 mb-2 mr-2"
                  />
                  <div>
                    <p>DPD Delivery</p>
                    <p>Saturday & Sunday Delivery</p>
                  </div>
                </div>
                <div className="ml-24">
                  <p>$0.5</p>
                </div>
              </div>
              <button className="px-12 py-2 bg-gray-300 rounded-xl flex mx-auto">
                View carrier details
              </button>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <div className="flex justify-between items-center">
                <h6>Activity</h6>
                <div>
                  <p>All Activity</p>
                </div>
              </div>
              <ul className="">
                <li>
                  <h5>Today</h5>
                  <div className="ml-2 mb-2">
                    <p className="text-gray-600">
                      10:32 AM - <strong>Order</strong> was delivery to customer
                    </p>
                    <p className="text-gray-600">
                      6:32 AM - <strong>Item</strong> was check by police
                    </p>
                  </div>
                </li>
                <li>
                  <h5>Yesterday</h5>
                  <div className="ml-2 mb-2">
                    <p className="text-gray-600">
                      10:32 AM - <strong>Order</strong> was delivery to customer
                    </p>
                    <p className="text-gray-600">
                      6:32 AM - <strong>Item</strong> was check by police
                    </p>
                  </div>
                </li>
                <li>
                  <h5>Last week</h5>
                  <div className="ml-2 mb-2">
                    <p className="text-gray-600">
                      10:32 AM - <strong>Order</strong> was delivery to customer
                    </p>
                    <p className="text-gray-600">
                      6:32 AM - <strong>Item</strong> was check by police
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
