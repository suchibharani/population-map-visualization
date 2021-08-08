import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '../store'
import Layout from '../components/layout';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
