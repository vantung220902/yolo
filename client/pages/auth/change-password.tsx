import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BG from '../../assets/bg.jpg';
import InputField from '../../components/InputField';
import { useCheckAuth } from '../../hooks';
import useToken from '../../hooks/useToken';
import { changePasswordAsync, getMeAsync } from '../../redux/authRedux/actions';
import { IRootReducers } from '../../redux/rootReducer';
import { defaultSize } from '../../services/ui';
import { mapFieldErrors } from '../../utils/mapFieldError';
import * as yup from 'yup';
export interface ChangeInput {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
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
  const initialValues: ChangeInput = { password: '', confirmPassword: '' };
  const [error, setError] = useState<{ [key: string]: string }>({});
  const onSubmit = async (values: ChangeInput) => {
    const { token, userId } = router.query;
    dispatch(changePasswordAsync.request({ token: token as string, userId: userId as string, ...values }));
  };
  useEffect(() => {
    if (auth.error) {
      setError(mapFieldErrors(auth.error));
    }
  }, [auth]);
  const schema = yup.object({
    password: yup.string().min(5, 'Password must be least 5 characters').required('Please enter password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password must match')
      .required('Please enter confirm password'),
  });
  const renderError = () => {
    let body = null;
    for (let i in error) {
      body = (
        <div className="my-4">
          <h4 className="text-red-600">{error[i]}</h4>
        </div>
      );
    }
    return body;
  };
  if (auth.user) router.push('/');
  return (
    <div className="w-full h-full fixed">
      <img src={BG.src} className="w-full h-full absolute " alt="anh" />
      <div className="w-[600px] 2xl:h-[70%] mx-auto my-12 absolute z-10 inset-0 bg-[#ffffff] shadow-lg rounded-lg px-4 py-8">
        <h2 className="text-center">Change password </h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
          {({ isSubmitting }) => (
            <Form className="px-8 pt-6 pb-8 mb-4">
              <InputField name="password" placeholder="New Password" label="New Password" type="password" />
              <InputField name="confirmPassword" placeholder="Confirm Password" label="Confirm Password" type="password" />
              {Object.keys(error).length > 0 && renderError()}
              <button className="btn w-[100%] mb-2" type="submit">
                {isSubmitting ? <AiOutlineLoading size={defaultSize} className="mx-auto text-md  animate-rotate" /> : 'Submit'}
              </button>
              <div className="flex items-center justify-between">
                <Link href="/auth/register">
                  <p className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800">Register</p>
                </Link>
                <Link href="/auth/forgot-password">
                  <p
                    className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800"
                  >
                    Login
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

export default ChangePassword;
