import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import BG from '../../assets/bg.jpg';
import Button from '../../components/common/Button';
import InputField from '../../components/InputField';
import { useCheckAuth } from '../../hooks';
import useToken from '../../hooks/useToken';
import { getMeAsync, loginAsync } from '../../redux/authRedux/actions';
import { LoginInput } from '../../redux/authRedux/type';
import { IRootReducers } from '../../redux/rootReducer';
import { defaultSize } from '../../services/ui';
import { mapFieldErrors } from '../../utils/mapFieldError';
import * as yup from 'yup';
import RenderError from 'components/RenderError';
const Login = () => {
  const router = useRouter();
  const auth = useSelector((state: IRootReducers) => state.auth);
  const dispatch = useDispatch();
  const schema = yup.object({
    usernameOrEmail: yup
      .string()
      .trim('Username Or Email must be not includes space')
      .strict(true)
      .required('Please enter user name'),
    password: yup
      .string()
      .min(5, 'Password must be least 5 characters')
      .required('Please enter password'),
  });
  useEffect(() => {
    const checkData = async () => {
      const fetchData = await useCheckAuth(router);
      if (fetchData) dispatch(getMeAsync.success(fetchData));
    };
    if (useToken.getToken()) {
      checkData();
    }
  }, []);
  const initialValues: LoginInput = { usernameOrEmail: '', password: '' };
  const [error, setError] = useState<{ [key: string]: string }>({});
  const onLogin = async (values: LoginInput) => {
    dispatch(loginAsync.request(values));
  };
  useEffect(() => {
    if (auth.error) {
      setError(mapFieldErrors(auth.error));
    }
  }, [auth]);

  if (auth.user) router.push('/');
  return (
    <div className="w-full h-full fixed">
      <img src={BG.src} className="w-full h-full absolute " alt="anh" />
      <div className="w-[600px] 2xl:h-[70%] mx-auto my-12 absolute z-10 inset-0 bg-[#ffffff] shadow-lg rounded-lg px-4 py-8">
        <h2 className="text-center">Login </h2>
        <Formik initialValues={initialValues} onSubmit={onLogin} validationSchema={schema}>
          {({ isSubmitting, isValid }) => (
            <Form className="px-8 pt-6 pb-8 mb-4">
              <InputField
                name="usernameOrEmail"
                placeholder="Username Or Email"
                label="Username Or Email"
                type="text"
              />
              <InputField name="password" placeholder="Password" label="Password" type="password" />
              {Object.keys(error).length > 0 && <RenderError error={error} isValid={isValid} />}
              <Button
                loading={auth.loading}
                disabled={auth.loading || !isValid}
                className="btn w-[100%] mb-2"
                type="submit"
              >
                {isSubmitting ? (
                  <AiOutlineLoading
                    size={defaultSize}
                    className="mx-auto text-md  animate-rotate"
                  />
                ) : (
                  'Sign In'
                )}
              </Button>
              <div className="flex items-center justify-between">
                <Link href="/auth/register">
                  <p
                    className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800"
                  >
                    Register
                  </p>
                </Link>
                <Link href="/auth/forgot-password">
                  <p
                    className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800"
                  >
                    Forgot Password?
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

export default Login;
