import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import classes from './PostList.module.css';
import Post from '../PostCreate/Post/Post';
// import Error from '../../../Components/UI/Error/Error'
import Spinner from '../../../Components/UI/Spinner/Spinner'


class PostList extends Component {
	state = {
		posts: [],
		user: null
	};
	// postSelectedHandler = (id) => {
	//     // this.setState({selectedPostId: id});
	//     console.log('post selected')
	// }
	deletePostHandler = (e) => {
		const postId = e.target.parentElement.parentElement.id;
		this.props.onDeletePost(postId)
	};
	componentDidMount() {
		this.props.onGetPosts()
		let user = localStorage.getItem('userId')
		this.setState({user: user})
	}
	render() {
		
		let posts
		if (this.props.posts) {
			posts = this.props.posts.map((post) => {
				return (
					<Post
						usersPosts={this.state.user === this.props.posts[this.props.posts.indexOf(post)].creator}
						key={post._id}
						id={post._id}
						title={post.title}
						content={post.content}
						creator={post.creator}
						editPost={this.editPostHandler}
						deletePost={this.deletePostHandler}
						image={
							this.props.posts[this.props.posts.indexOf(post)].image ? (
								this.props.posts[this.props.posts.indexOf(post)].image
							) : null
						}
						// clicked={() => this.postSelectedHandler}
					/>
				);
			});
		}
		return (
			<ul className={classes.PostList}>
				{this.props.loading ? 
				<Spinner showSpinner={this.props.loading} /> 
				:  this.props.posts ? 
					this.props.posts.length > 0 ? posts : <li>No yips yapped...yet!</li> 
				: <li>No yips yapped...yet!</li>}
			</ul>  
		);
	}
}
const mapStateToProps = state => {
    return {
		posts: state.postList.posts,
		error: state.postList.error,
		loading: state.postList.loading
    }
}
const mapDispatchToprops = dispatch => {
	return {
		onGetPosts: () => dispatch(actions.getPosts()),
		onDeletePost: (postId) => dispatch(actions.deletePost(postId))
	};
};

export default connect(mapStateToProps, mapDispatchToprops)(PostList);