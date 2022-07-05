import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import { useEffect } from 'react';
import useToken from '../hooks/useToken';
import GlobalLoading from '../components/GlobalLoading';
import ModalView from '../components/Modal/ModalView';


const store = configStore();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    useToken.getRefreshToken();

  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <GlobalLoading />
      <ModalView />
    </Provider>
  );
}

export default MyApp
