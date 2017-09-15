import React from 'react'
import styled from 'styled-components'
import Layout from 'layouts/Main'
import showdown from "showdown";
const converter = new showdown.Converter();

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 75%;
  margin: 0 0 50px 0;
  
  h2{ 
      margin: 0 0 20px 0;
      padding: 0;
      font-size: 25px;
      color: #333;
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
    color: #0366d6;
    text-decoration: none;
  }
  
  & ul{
    padding-left: 2em;
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
    background: #f6f8fa;
    padding: 2px 5px;
  }
  & pre {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    background: #f6f8fa;
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
    return { content:content,title:query.title,articles:query.articles  }
  }


  render() {
    const { title, content, date,articles } = this.props;

    return (
      <Layout articles={articles}>
    <Wrapper>
      <h2>
       {title}
      </h2>
      <Content dangerouslySetInnerHTML={{ __html: content }}/>
    </Wrapper>
  </Layout>
    );
  }
}