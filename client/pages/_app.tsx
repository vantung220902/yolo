import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import configStore from '../config/configStore'
import { useEffect } from 'react';
import useToken from '../utils/useToken';

const store = configStore();

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    useToken.getRefreshToken();
  }, [])

  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
