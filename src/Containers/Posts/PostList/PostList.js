/* eslint-disable no-unused-vars */
import { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import classes from './PostList.module.css'
import Post from '../PostCreate/Post/Post'
import * as postListActions from '../../../store/actions/index'

class PostList extends Component{
    // postSelectedHandler = (id) => {
    //     // this.setState({selectedPostId: id});
    //     console.log('post selected')
    // }
    // editPostHandler = (e) => {
    //     let title = e.target.parentElement.parentElement.parentElement.children[0].innerText
    //     let content = e.target.parentElement.parentElement.parentElement.children[1].innerText
    //     let postId = e.target.parentElement.parentElement.parentElement.id
    //     // console.log(postId, title, content)
    // }
    deletePostHandler = (e) => {
        const postId = e.target.parentElement.parentElement.id
        this.props.onDeletePost(postId)
    }
    componentDidMount() {
       this.props.onGetPosts()
    }
    render(){
       let posts = <li><p>ERROR!</p></li>
       if(!this.props.error) {
           posts = this.props.posts.map(post => {
               return <Post
                        key={post._id} 
                        id={post._id}
                        title={post.title} 
                        content={post.content}
                        deletePost={this.deletePostHandler}
                        image={
                            this.props.posts[this.props.posts.indexOf(post)].image ? 
                            this.props.posts[this.props.posts.indexOf(post)].image : null} 
                            />
           })
       }
        return(
            <ul className={classes.PostList}>   
                {this.props.posts.length > 0 ? posts: <p>NO POSTS ADDED YET!!!</p>}
            </ul>
        )
    }
}
const mapStateToProps = state => {
    return {
        posts: state.postList.posts,
        error: state.postList.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetPosts: () => dispatch(postListActions.getPosts()),
        onDeletePost: (postId) => dispatch(postListActions.deletePost(postId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

