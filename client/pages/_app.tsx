import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import { useEffect } from 'react';
import useToken from '../hooks/useToken';
import GlobalLoading from '../components/GlobalLoading';


const store = configStore();

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    useToken.getRefreshToken();

  }, [])

  return <Provider store={store}>
    <Component {...pageProps} />
    <GlobalLoading />
  </Provider>
}

export default MyApp
