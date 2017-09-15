import Head from 'next/head'
import Wrapper from './Wrapper'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import styled from 'styled-components'
import Post from 'components/Post'



export default class Main extends React.PureComponent {

  render() {
    const { children, title = "kit's blog",articles = [] } = this.props;
    return (
      <div>
        <Head>
          <title>{ title }</title>
        </Head>
        <header style={{flex:'0 0 auto'}}>
            <Nav />
          </header>
        <Wrapper>
          
         <main>
          { children }
         </main>
          
          
        </Wrapper>
      </div>
    );
  }
}