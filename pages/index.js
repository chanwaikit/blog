import React from 'react'
import Layout from 'layouts/Main'
// import { getPosts } from 'api/posts'

import Post from 'components/Post'


export default class Index extends React.PureComponent {
	static async getInitialProps({ query }) {
		
		return { articles: query.articles || [] };
	}

	render() {
		const { articles } = this.props;
		return (
			<Layout>
    			<ul>
     			 {articles.map(p => <Post key={p.link} post={p} />)}
   				</ul>
 			</Layout>
		);
	}
}