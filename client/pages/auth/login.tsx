import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { connect } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bindActionCreators, Dispatch } from 'redux';
import { login } from '../../actions/auth';
import BG from '../../assets/bg.jpg';
import InputField from '../../components/InputField';
import { IAction } from '../../types/actionType';
import { IMe, LoginInput } from '../../types/Auth';
import { IAuthReducer, IRootReducers } from '../../types/typeReducers';
import { mapFieldErrors } from '../../utils/mapFieldError';
import Link from 'next/link'
import { defaultSize } from '../../constants/ui';
import { useCheckAuth } from '../../utils/useCheckAuth';

export interface IPropsLogin {
    auth: IAuthReducer,
    login: (payload: LoginInput) => IAction
}

const Login = ({ auth, login }: IPropsLogin) => {

    const router = useRouter();
    const [_, setData] = useState<IMe | undefined>()

    useEffect(() => {
        const checkData = async () => {
            const fetchData = await useCheckAuth(router);
            if (fetchData) setData(fetchData)
        }
        checkData();
    }, [])
    const initialValues: LoginInput = { usernameOrEmail: '', password: '' };
    const [error, setError] = useState<{ [key: string]: string }>({});
    const onLogin = async (values: LoginInput) => {
        login(values);
    };
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
        toast.warn('Login fail!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return body;
    }
    if (auth.user) router.push('/')
    return (
        <div className='w-full h-full fixed'>
            <img src={BG.src} className='w-full h-full absolute ' alt='anh' />
            <div className="w-[600px] mx-auto my-12 absolute z-10 inset-0 bg-[#ffffff] shadow-lg rounded-lg px-4 py-8">
                <h2 className='text-center'>Login </h2>
                <Formik initialValues={initialValues} onSubmit={onLogin}>
                    {({ isSubmitting }) => (<Form className="px-8 pt-6 pb-8 mb-4">
                        <InputField name="usernameOrEmail" placeholder="Username Or Email" label="Username Or Email"
                            type="text" />
                        <InputField name="password" placeholder="Password" label="Password"
                            type="password"
                        />
                        {
                            Object.keys(error).length > 0 && renderError()

                        }
                        <button className="btn w-[100%] mb-2" type="submit">
                            {isSubmitting ? <AiOutlineLoading size={defaultSize} className='mx-auto text-md  animate-rotate' /> : 'Sign In'}
                        </button>
                        <div className='flex items-center justify-between'>
                            <Link href="/auth/register">
                                <p className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800" > Register</p>
                            </Link>
                            <Link href="/auth/forgot_password">
                                <p className="cursor-pointer inline-block align-baseline font-bold text-md text-blue-500
                             hover:text-blue-800">Forgot Password?</p>
                            </Link>
                        </div>

                    </Form>)}
                </Formik>
                <ToastContainer />
            </div>
        </div>

    )
}

const mapStateToProps = (state: IRootReducers) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Login)