import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux';
import Layout from '../components/organisms/Layout';
import store from '../redux/store';
import '../styles/globals.scss';


function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </Provider>
  )
}

export default MyApp
