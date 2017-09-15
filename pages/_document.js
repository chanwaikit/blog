import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import 'styles/global-styles'
import Footer from 'components/Footer'
import Nav from 'components/Nav'
export default class SiteDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html style={{height:'100%'}}>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel="stylesheet" href="/static/markdown/github-gist.css"/>
          {styleTags}
        </Head>
        <body style={{display: 'flex',flexDirection: 'column',height: '100%',margin:'0'}}  >
          <div className='root' style={{flex:1}}>
            {main}
          </div>
           <Footer style={{flex:'0 0 auto'}}>
              <div >Brought to you by <a href="https://github.com/chanwaikit" target="_blank" >chanwaikit</a></div>
              <div><a href="http://chanwaikit.coding.me"  >here</a></div>
          </Footer>
          <NextScript />
          <script src="/static/markdown/highlight.pack.js" />
          <script>hljs.initHighlightingOnLoad();</script>
        </body>
      </html>
    )
  }
}
