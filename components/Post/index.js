import React from 'react'
import { Link } from 'routes'
import Wrapper from './Wrapper'

// const PostItem = ({ post,title,link }) => {
// return (
//   <Wrapper>
//   		<a href={post.link}>
//         	<h3>{post.title}</h3>
//         	<p>{post.date}</p>
//         </a>
//   </Wrapper>
// )}

// export default PostItem



export default class PostItem extends React.PureComponent {
	

	render() {
		const { post,title,link } = this.props
		return (
			<Wrapper>
  				<a href={post.link}>
        			<h3>{post.title}</h3>
        			<p>{post.date}</p>
       			</a>
  			</Wrapper>
		);
	}
}