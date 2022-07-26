import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from '../components/GlobalLoading';
import ModalView from '../components/Modal/ModalView';
import useToken from '../hooks/useToken';
import configStore from '../redux/store';
import '../styles/globals.css';
const store = configStore();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    useToken.getRefreshToken();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <GlobalLoading />
      <ModalView />
    
    </Provider>
  );
}

export default MyApp;
