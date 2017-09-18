import React from 'react'
import { Link } from 'routes'
import styled from 'styled-components'

const Wrapper = styled.div`

  a {
    text-decoration: none;
    display: block;
    margin: 0 10px 8px 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #444;
    -webkit-text-decoration: none;
    text-decoration: none;
    font-size: 14px;
   
  }
  a:visited{
    color: #444;
    text-decoration: underline;
  }


  p {
    font-size: 1.2rem;
    line-height: 35px;
    color: #444;
    font-family: "PT Serif", sans-serif;
    margin: 0;
  }
`
const WrapperDiv =  styled.div`
    margin: 0 10px 8px 0;
`

export default class PostItem extends React.PureComponent {
	

	render() {
		const { post,title,link,index,pathname } = this.props;
		return (
			<Wrapper>
				<WrapperDiv>
  					<a style={pathname == post.link || (pathname=='/'&&index == 0)?{'fontWeight': 600,color: '#E25E5E'}:{}} href={post.link}>
  						{post.date} - {post.title}
       			</a>
       			</WrapperDiv>
  			</Wrapper>
		);
	}
}