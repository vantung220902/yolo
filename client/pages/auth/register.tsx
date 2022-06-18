import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../../actions/auth';
import BG from '../../assets/bg.jpg';
import InputField from '../../components/InputField';
import { defaultSize } from '../../constants/ui';
import { IAction } from '../../types/actionType';
import { IMe, RegisterInput } from '../../types/Auth';
import { IAuthReducer, IRootReducers } from '../../types/typeReducers';
import { mapFieldErrors } from '../../utils/mapFieldError';
import { useCheckAuth } from '../../utils/useCheckAuth';

export interface IPropsLogin {
    auth: IAuthReducer,
    register: (payload: RegisterInput) => IAction
}

const Register = () => {

    const router = useRouter();
    const [_, setData] = useState<IMe | undefined>()
    const auth = useSelector((state: IRootReducers) => state.auth);
    const dispatch = useDispatch();
    const registerDispatch = (payload: RegisterInput) => dispatch(register(payload))
    useEffect(() => {
        const checkData = async () => {
            const fetchData = await useCheckAuth(router);
            if (fetchData) setData(fetchData)
        }
        checkData();
    }, [])
    const initialValues: RegisterInput = { username: '', email: '', password: '' };
    const [error, setError] = useState<{ [key: string]: string }>({});
    const onRegister = async (values: RegisterInput) => {
        registerDispatch(values);
    }
    useEffect(() => {
        if (auth.error) {
            setError(mapFieldErrors(auth.error));
        }
    }, [auth]);

    const renderError = () => {
        let body = null;
        for (let i in error) {
            body = (
                <div className='my-4'>
                    <h4 className='text-red-600'>{error[i]}</h4>
                </div>
            )
        }
        return body;
    }
    if (auth?.user) router.push('/')

    return (
        <div className='w-full h-full fixed'>
            <img src={BG.src} className='w-full h-full absolute ' alt='anh' />
            <div className="w-[600px] mx-auto my-12 absolute z-10 inset-0 bg-[#ffffff] shadow-lg rounded-lg px-4 py-8">
                <h2 className='text-center'>Register </h2>
                <Formik initialValues={initialValues} onSubmit={onRegister}>
                    {({ isSubmitting }) => (<Form className="px-8 pt-6 pb-8 mb-4">
                        <InputField name="username" placeholder="Username" label="Username"
                            type="text" />
                        <InputField name="email" placeholder="Email" label="Email"
                            type="text" />
                        <InputField name="password" placeholder="Password" label="Password"
                            type="password"
                        />
                        {
                            Object.keys(error).length > 0 && renderError()

                        }
                        <button className="btn w-[100%] mb-2" type="submit">
                            {isSubmitting ?
                                <AiOutlineLoading size={defaultSize} className='mx-auto text-md  animate-rotate' />
                                : 'Register'}
                        </button>
                        <div className='flex items-center justify-between'>
                            <Link className="inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800" href="/aut/login">
                                Login
                            </Link>
                        </div>
                    </Form>)}
                </Formik>
                <ToastContainer />
            </div>
        </div>

    )
}


export default Register