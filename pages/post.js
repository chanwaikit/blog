import React from 'react'
import styled from 'styled-components'
import Layout from 'layouts/Main'
import { getPost } from 'api/posts'
import showdown from "showdown";
const converter = new showdown.Converter();

const Wrapper = styled.div`
  padding: 3rem;
  max-width: 750px;
  margin: 0 auto;

  @media (max-width: 750px) {
    width: 100%;
    padding: 1rem;
  }

  h1 {
    color: #222;
    font-weight: bold;
    font-size: 1.75rem;
    line-height: 35px;
    font-family: "PT Sans", sans-serif;
    text-transform: capitalize;
    margin: 0;
  }

  li{
    line-height: 28px;
    font-family: "PT Sans", sans-serif;
  }



  p {
    line-height: 28px;
    font-family: "PT Sans", sans-serif;
  }
`

const Content = styled.div`
  background-color: #fff;
  font-size: 15px;
  color: #333;
  @media screen and (min-width: 770px) {
    min-height: 500px;
    & a:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  & a {
    color: #3194d0;
  }
  & p,
  & li {
    line-height: 1.8;
  }
  & img {
    display: block;
    max-width: 100%;
    margin: 0 auto 30px;
    @media screen and (min-width: 770px) {
      max-width: 500px;
    }
  }
  & code {
    background: #f2f2f2;
    padding: 2px 5px;
  }
  & pre {
    background: #f2f2f2;
    padding: 20px;
    overflow-x: auto;
    line-height: 1.8;
    & > code {
      padding: 0;
    }
  }
`;



export default class Post extends React.PureComponent {
  static async getInitialProps({ query }) {
    const content = converter.makeHtml(query.content);
    return { content:content,title:query.title  }
  }


  render() {
    const { title, content, date } = this.props;

    return (
      <Layout>
    <Wrapper>
      <h1>
       {title}
      </h1>
      <Content dangerouslySetInnerHTML={{ __html: content }}/>
    </Wrapper>
  </Layout>
    );
  }
}