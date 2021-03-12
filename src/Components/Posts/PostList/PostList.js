/* eslint-disable no-unused-vars */
import { Component } from 'react'
import axios from 'axios'

import classes from './PostList.module.css'
import Post from '../PostCreate/Post/Post'
import PostCreate from '../PostCreate/PostCreate'

class PostList extends Component{
    state = {
        posts: []
    }
    // postSelectedHandler = (id) => {
    //     // this.setState({selectedPostId: id});
    //     console.log('post selected')
    // }
    editPostHandler = (e) => {
        let title = e.target.parentElement.parentElement.parentElement.children[0].innerText
        let content = e.target.parentElement.parentElement.parentElement.children[1].innerText
        let postId = e.target.parentElement.parentElement.parentElement.id
        // console.log(postId, title, content)
    }
    deletePostHandler = (e) => {
        const postId = e.target.parentElement.parentElement.id
        axios
        .delete('/posts/' + postId)
        .then((res) => {
            let updatedPosts  = this.state.posts.filter(post => post._id !== postId)
            if(this.state.posts.length - 1 === 0){
                this.setState({posts: updatedPosts, hasPosts: false})
            } else {
                this.setState({savedPosts: updatedPosts})
            }
            this.setState({posts: updatedPosts})
        })
        .catch((e) => console.log(e))
    }
    componentDidMount() {
        axios
        .get('/posts')
        .then(response => {
            const posts = response.data.posts.slice(0, 5)
            const updatedPosts = posts.map(post => {
                return {
                    ...post
                }
            })
            
            this.setState({posts: updatedPosts})
            
        })
        .catch(error => {
            console.log(error);
            // this.setState({error: true});
        });
    }
    render(){
        let posts = <li style={{textAlign: 'center'}}>Something went wrong!</li>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post._id} 
                    id={post._id}
                    title={post.title} 
                    content={post.content}
                    editPost={this.editPostHandler}
                    deletePost={this.deletePostHandler}
                    // clicked={() => this.postSelectedHandler}
                     />;
            });
        }
        return(
            <ul className={classes.PostList}>   
                {this.state.posts.length > 0 ? posts: <p>NO POSTS ADDED YET!!!</p>}
            </ul>
        )
    }
}

export default PostList
