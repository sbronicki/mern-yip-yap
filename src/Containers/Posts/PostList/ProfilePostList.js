import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import classes from './PostList.module.css';
import Post from '../PostCreate/Post/Post';
import Error from '../../../Components/UI/Error/Error'
import Spinner from '../../../Components/UI/Spinner/Spinner'

class PostList extends Component {
	state = {
		posts: [],
		user: null,
		profile: null
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
		const user = localStorage.getItem('username')
		const profile = this.props.profile
        this.props.onGetUserPosts(profile)
		this.setState({user: user, profile: profile})
	}
	render() {
		let posts
		if (this.props.posts) {
			posts = this.props.posts.map((post) => {
				return (
					<Post
						usersPosts={this.props.profile === this.state.user}
						// usersPosts={this.props.profile === this.props.posts[this.props.posts.indexOf(post)].username}
						key={post._id}
						id={post._id}
						title={post.title}
						content={post.content}
						creator={post.creator}
						creatorUsername={post.username}
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
				{this.props.error ?  <Error errorStatus={this.props.errorStatus} errorMessage={this.props.errorMessage} /> : null}
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
		errorStatus: state.postList.errorStatus,
        errorMessage: state.postList.errorMessage,
		loading: state.postList.loading
    }
}
const mapDispatchToprops = dispatch => {
	return {
		onGetUserPosts: (username) => dispatch(actions.getUserPosts(username)),
		onDeletePost: (postId) => dispatch(actions.deletePost(postId))
	};
};
// const mapDispatchToprops = dispatch => {
// 	return {
// 		onGetUserPosts: (userId) => dispatch(actions.getUserPosts(userId)),
// 		onDeletePost: (postId) => dispatch(actions.deletePost(postId))
// 	};
// };

export default connect(mapStateToProps, mapDispatchToprops)(PostList);