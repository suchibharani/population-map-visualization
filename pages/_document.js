/*********************************************************
  * File name: _document.js
  * Author:  Suchitra
  * Description :  It helps to put up all static files and meta tags
*********************************************************/
import Document, { Head, Main, NextScript, Html } from 'next/document'
import Helmet from 'react-helmet'
import stylesheet from '../static/scss/styles.scss'

// Import Asset Config
import getConfig from 'next/config';
import {assetConfig} from '../constants/assetConfig.js';
const {publicRuntimeConfig} = getConfig()
const {siteEnv} = publicRuntimeConfig;
let assetVal = assetConfig[siteEnv];


let date = new Date();
let timestamp = date.getTime();

export default class extends Document {
  static async getInitialProps (...args) {
    const documentProps = await super.getInitialProps(...args)

    return { ...documentProps, helmet: Helmet.renderStatic() }
  }

  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  get helmetJsx () {
    return (
      <Helmet>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Helmet>
    )
  }

  render () {
    let customCss = assetVal.PREFIX+"/static/css/custom.css?v="+timestamp
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          {/* { this.helmetJsx } */}
          {/* { this.helmetHeadComponents } */}
          <link rel="shortcut icon" type="image/png" href=""/>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap" rel="stylesheet"/>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
          <link rel="stylesheet" href={assetVal.PREFIX+"/static/css/base.css"}/>
          <link rel="stylesheet" href={customCss} />
          <meta name="robots" content="noindex" />
          <meta name='viewport' content='width=device-width, initial-scale=1' />        
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
        <style jsx>{stylesheet}</style>
      </Html>
    )
  }
}
