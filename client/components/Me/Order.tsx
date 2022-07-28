import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderAsync } from 'redux/cartRedux/action';
import { IRootReducers } from 'redux/rootReducer';
import OrderItem from './OrderItem';
const Order = () => {
  const orders = useSelector((state: IRootReducers) => state.cart.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderAsync.request());
  }, []);
  if (orders.length === 0) return <div>No order</div>;
  return (
    <div className="col-span-8 h-screen overflow-scroll">
      <h5 className="py-4">Customer's Cart</h5>
      <div className="col-span-6 overflow-scroll">
        {orders?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
export default Order;
