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
        key={this.savedPosts.length} />

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
            // console.log(response)
        })
        .catch(error => console.log(error))
     }
// write code for componentDidMount and savePostHandler into one function to be used by both
// add edit and delete options to posts and wire up to server
// clear input fields after saving a new post
// not allow posts if missing title or content / disable button
     componentDidMount(){
         axios
         .get('http://localhost:4200/posts')
         .then(response => {
             if(response.data.posts !== []){ 
                for(let post of response.data.posts){
                    this.savedPost.postTitle = post.title
                    this.savedPost.postContent = post.content
                    this.savedPosts.push(
                        <Post
                            title={post.title} 
                            content={post.content} 
                            key={post._id}
                            id={post._id} />
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
        console.log(this.state)
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