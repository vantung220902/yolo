import Button from '../../components/common/Button';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import BG from '../../assets/bg.jpg';
import InputField from '../../components/InputField';
import { useCheckAuth } from '../../hooks';
import { getMeAsync, registerAsync } from '../../redux/authRedux/actions';
import { RegisterInput } from '../../redux/authRedux/type';
import { IRootReducers } from '../../redux/rootReducer';
import { defaultSize } from '../../services/ui';
import { mapFieldErrors } from '../../utils/mapFieldError';
import * as yup from 'yup';
const Register = () => {
  const auth = useSelector((state: IRootReducers) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkData = async () => {
      const fetchData = await useCheckAuth(router);
      if (fetchData) dispatch(getMeAsync.success(fetchData));
    };
    checkData();
  }, []);
  const schema = yup.object({
    username: yup.string().required('Please enter user name'),
    email: yup.string().email('Email is incorrect').required('Please enter email'),
    password: yup.string().min(5, 'Password must be least 5 characters').required('please enter password'),
  });
  const initialValues: RegisterInput = {
    username: '',
    email: '',
    password: '',
  };
  const [error, setError] = useState<{ [key: string]: string }>({});
  const onRegister = async (values: RegisterInput) => {
    dispatch(registerAsync.request(values));
  };
  useEffect(() => {
    if (auth.error) {
      setError(mapFieldErrors(auth.error));
    }
  }, [auth]);

  const renderError = (isValid: boolean) => {
    let body = null;
    if (isValid) return body;
    for (let i in error) {
      body = (
        <div className="my-4">
          <h4 className="text-red-600">{error[i]}</h4>
        </div>
      );
    }
    return body;
  };
  if (auth?.user) router.push('/');

  return (
    <div className="w-full h-full fixed">
      <img src={BG.src} className="w-full h-full absolute " alt="anh" />
      <div className="w-[600px] mx-auto my-12 absolute z-10 inset-0 bg-[#ffffff] shadow-lg rounded-lg px-4 py-8">
        <h2 className="text-center">Register </h2>
        <Formik initialValues={initialValues} onSubmit={onRegister} validationSchema={schema}>
          {({ isSubmitting, isValid }) => (
            <Form className="px-8 pt-6 pb-8 mb-4">
              <InputField name="username" placeholder="Username" label="Username" type="text" />
              <InputField name="email" placeholder="Email" label="Email" type="text" />
              <InputField name="password" placeholder="Password" label="Password" type="password" />
              {Object.keys(error).length > 0 && renderError(isValid)}
              <Button loading={auth.loading} disabled={auth.loading || !isValid} className="btn w-[100%] mb-2" type="submit">
                {isSubmitting ? <AiOutlineLoading size={defaultSize} className="mx-auto text-md  animate-rotate" /> : 'Register'}
              </Button>
              <div className="flex items-center justify-between">
                <Link
                  className="inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800"
                  href="/auth/login"
                >
                  Login
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

export default Register;
