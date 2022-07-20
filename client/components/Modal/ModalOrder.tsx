import { useFormik } from 'formik';
import { AiOutlineClose } from 'react-icons/ai';
import { GoGistSecret, GoLocation, GoNote } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { MESSAGE_ORDER } from '../../config/constant';
import { addOrderAsync } from '../../redux/cartRedux/action';
import { IOrderRequest } from '../../redux/cartRedux/type';
import { hiddenModal } from '../../redux/commonRedux/actions';
import { IRootReducers } from '../../redux/rootReducer';
import { defaultSize } from '../../services/ui';
import { addDays, TODAY } from '../../utils';

const ModalOrder = ({
  productId,
  total,
}: {
  productId: string[];
  total: string[];
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducers) => state.auth.user);
  const todayEstimate = addDays(TODAY, 3);
  const schema = yup.object({
    userName: yup.string().required(),
    address: yup.string().min(5).required(),
    deliveryDate: yup
      .date()
      .min(
        todayEstimate,
        ({ min }) => `${MESSAGE_ORDER.MESSAGE_ORDER_FAILURE} + ${min}`!!,
      )
      .required(),
    secret: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      userName: user?.username || '',
      note: '',
      address: '',
      productId,
      deliveryDate: todayEstimate,
      secret: '',
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: schema,
  });

  const handleSubmit = (value: IOrderRequest) => {
    const { note, address, deliveryDate, secret } = value;
    const newOder = {
      note,
      address,
      deliveryDate,
      secret,
      quantity: total.join(','),
      productId: productId.join(','),
    };
    dispatch(addOrderAsync.request(newOder));
  };

  const renderError = (message: string) => (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );

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
          <form onSubmit={formik.handleSubmit}>
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Owner Name
            </label>
            <input
              id="userName"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {formik.errors.userName &&
              formik.touched.userName &&
              renderError(formik.errors.userName)}

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
                name="address"
                placeholder="Your current address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address &&
                formik.touched.address &&
                renderError(formik.errors.address)}
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
                value={formik.values.deliveryDate}
                onChange={formik.handleChange}
              />
              {formik.errors.deliveryDate &&
                formik.touched.deliveryDate &&
                renderError(formik.errors.deliveryDate)}
            </div>
            <label
              htmlFor="secret"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Secret
            </label>
            <div className="relative mb-4 mt-2">
              <div className="absolute top-0 bottom-0 right-0 my-2.5 mx-3.5">
                <GoGistSecret size={'1.175rem'} />
              </div>
              <input
                id="secret"
                className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Your secret"
                name="secret"
                type="password"
                value={formik.values.secret}
                onChange={formik.handleChange}
              />
              {formik.errors.secret &&
                formik.touched.secret &&
                renderError(formik.errors.secret)}
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
                value={formik.values.note}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex items-center justify-start w-full">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 
                  bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                type={'submit'}
              >
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
              <AiOutlineClose size={defaultSize} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalOrder;
