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

  p {
    line-height: 28px;
    color: #666;
    font-family: "PT Sans", sans-serif;
  }
`

const PostPage = ({ content,title  }) =>
   <Layout>
    <Wrapper>
      <h1>
       {title}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: content }}> 
      </p>
    </Wrapper>
  </Layout>
 

PostPage.getInitialProps = async ({ query }) => {
  const content = converter.makeHtml(query.content);
  return { content:content,title:query.title  }
}

export default PostPage
