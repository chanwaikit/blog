import Head from 'next/head'
import Wrapper from './Wrapper'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import styled from 'styled-components'
import Post from 'components/Post'

const Container = styled.div`
  margin: 30px 0 0 0;
  width:100%;

`
const Menu = styled.div`
  width:25%;
  display:inline-block;
  vertical-align: top;
  

  h3{
    padding: 0;
    margin: 0 0 15px 0;
    font-size: 18px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`

const MenuBody = styled.div`
  padding: 0 0 0 50px;
  h3 {
    padding: 0;
    margin: 0 0 15px 0;
    font-size: 18px;
    font-weight: 600;
  }
`

const Content = styled.div`
  width:75%;
  display:inline-block;
  vertical-align: top;
  margin: 0 0 50px 0;

`

const ContentBody = styled.div`
  border-left: 1px solid #DDD;
  padding-left: 20px;

`

export default class Main extends React.PureComponent {

  render() {
    const { children, title = "kit's blog",articles = []} = this.props;
    return (
      <div>
        <Head>
          <title>{ title }</title>
        </Head>
        <header style={{flex:'0 0 auto'}}>
            <Nav />
        </header>
        <Wrapper>
          
          <main >
            <Container>
              <Menu>
                <MenuBody>
                  <h3>Basics</h3>
                    <ul>
                      {articles.map((p,index) => <Post key={p.link} index={index} post={p} />)}
                    </ul>
                </MenuBody>
              </Menu>
              <Content>
                <ContentBody>
                  {children}
                </ContentBody>
              </Content>
            </Container>
          </main>

          
        </Wrapper>
      </div>
    );
  }
}