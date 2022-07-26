import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import BG from '../../assets/bg.jpg';
import Button from '../../components/common/Button';
import InputField from '../../components/InputField';
import { useCheckAuth } from '../../hooks';
import useToken from '../../hooks/useToken';
import { forgotPasswordAsync, getMeAsync } from '../../redux/authRedux/actions';
import { IRootReducers } from '../../redux/rootReducer';
import { defaultSize } from '../../services/ui';
const ForgotPassword = () => {
  const router = useRouter();
  const auth = useSelector((state: IRootReducers) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkData = async () => {
      const fetchData = await useCheckAuth(router);
      if (fetchData) dispatch(getMeAsync.success(fetchData));
    };
    if (useToken.getToken()) {
      checkData();
    }
  }, []);
  const initialValues = { email: '' };
  const onSubmit = async (values: { email: string }) => {
    dispatch(forgotPasswordAsync.request({ email: values.email?.trim() }));
    toast.success('🦄 Check your email', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const schema = yup.object({
    email: yup.string().email('Email is incorrect').required('Please enter email'),
  });
  if (auth.user) router.push('/');
  return (
    <div className="w-full h-full fixed">
      <img src={BG.src} className="w-full h-full absolute " alt="anh" />
      <div className="w-[600px] 2xl:h-[70%] mx-auto my-12 absolute z-10 inset-0 bg-[#ffffff] shadow-lg rounded-lg px-4 py-8">
        <h2 className="text-center">Forgot password </h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
          {({ isSubmitting, isValid }) => (
            <Form className="px-8 pt-6 pb-8 mb-4">
              <InputField name="email" placeholder="Email" label="Email" type="text" />
              <Button loading={auth.loading} disabled={auth.loading || !isValid} className="btn w-[100%] mb-2" type="submit">
                {isSubmitting ? <AiOutlineLoading size={defaultSize} className="mx-auto text-md  animate-rotate" /> : 'Submit'}
              </Button>
              <div className="flex items-center justify-between">
                <Link href="/auth/register">
                  <p className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800">Register</p>
                </Link>
                <Link href="/auth/forgot_password">
                  <p
                    className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800"
                  >
                    Submit
                  </p>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
