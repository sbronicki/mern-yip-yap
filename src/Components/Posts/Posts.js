import { Component } from 'react';
import axios from 'axios'

import classes from './Posts.module.css'
import PostCreate from './PostCreate/PostCreate'
import PostList from './PostList/PostList'
import Post from './PostCreate/Post/Post'

class Posts extends Component{
    state = {
        hasPosts: false,
        savedPosts: []
    }
   savedPost = { 
       postTitle: '',
       postContent: ''
    }
    savedPosts = []

    titleChangedHandler = (e) => {
         this.savedPost.postTitle = e.target.value
    }
    contentChangedHandler = (e) => {
        this.savedPost.postContent = e.target.value
    }
    savePostHandler = () => {
        const postToDisplay = <Post
        title={this.savedPost.postTitle} 
        content={this.savedPost.postContent} 
        key={this.savedPosts.length}
        editPost={this.editPostHandler}
        deletePost={this.deletePostHandler} />

        this.savedPosts.push(postToDisplay)
        this.setState({
            hasPosts: true,
            savedPosts: this.savedPosts
        })
        const post = {
            title: this.savedPost.postTitle,
            content: this.savedPost.postContent
        }

        axios
        .post('http://localhost:4200/posts', post)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
     }
     editPostHandler = (e) => {
        let post = e.target.parentElement.parentElement
        let postId = e.target.parentElement.parentElement.id
        console.log(post)
        console.log(postId)
     }
     deletePostHandler = (e) => {
        const postId = e.target.parentElement.parentElement.id
        axios
        .delete('http://localhost:4200/posts/' + postId)
        .then((res) => {
            let updatedPosts  = this.state.savedPosts.filter(post => post.props.id !== postId)
            console.log(this.state.savedPosts.length)
            if(this.state.savedPosts.length - 1 === 0){
                this.setState({savedPosts: updatedPosts, hasPosts: false})
            } else {
                this.setState({savedPosts: updatedPosts})
            }
        })
        .catch((e) => console.log(e))
     }
     componentDidMount(){
         axios
         .get('http://localhost:4200/posts')
         .then(response => {
             if(response.data.posts.length !== 0){ 
                for(let post of response.data.posts){
                    this.savedPost.postTitle = post.title
                    this.savedPost.postContent = post.content
                    this.savedPosts.push(
                        <Post
                            title={post.title} 
                            content={post.content} 
                            key={post._id}
                            id={post._id}
                            editPost={this.editPostHandler}
                            deletePost={this.deletePostHandler} />
                        )
                }
                this.setState({
                    hasPosts: true,
                    savedPosts: this.savedPosts
                })
            }
         })
         .catch(error => {
             console.log(error)
         })
     }
    render(){
        return(
            <div className={classes.Posts}>
                <PostCreate
                 titleChanged={this.titleChangedHandler} 
                 contentChanged={this.contentChangedHandler} 
                 savePost={this.savePostHandler} />
                <PostList hasPosts={this.state.hasPosts}>
                        {this.state.savedPosts}
                </PostList>
            </div>
        )
    }
}

export default Posts