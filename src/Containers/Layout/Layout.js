import { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import classes from './Layout.module.css'
import AuxWrapper from '../../HOC/AuxWrapper'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import PostCreate from '../../Components/Posts/PostCreate/PostCreate'
import PostList from '../../Components/Posts/PostList/PostList'
import Post from '../../Components/Posts/PostCreate/Post/Post'

class Layout extends Component {
	// initial state
	state = {
		showSideDrawer: false,
		hasPosts: false,
        savedPosts: []
	}
	// vars to update state
	savedPost = { 
		postTitle: '',
		postContent: ''
	 }
	 savedPosts = []
	// side drawer functios
	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}
	sideDrawerToggleHandle = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}
	// input fields change handlers
	titleChangedHandler = (e) => {
		this.savedPost.postTitle = e.target.value
	}
	contentChangedHandler = (e) => {
		this.savedPost.postContent = e.target.value
	}
	// post create save post handler 
	savePostHandler = () => {
        const post = {
            title: this.savedPost.postTitle,
            content: this.savedPost.postContent
        }
        axios
        .post('http://localhost:4200/posts', post)
        .then(response => {
            const savedPostId = response.data.postId
            const postToDisplay = <Post
            title={this.savedPost.postTitle} 
            content={this.savedPost.postContent} 
            key={this.savedPosts.length}
            editPost={this.editPostHandler}
            deletePost={this.deletePostHandler}
            id={savedPostId} />
    
            this.savedPosts.push(postToDisplay)
            this.setState({
                hasPosts: true,
                savedPosts: this.savedPosts
            }) 
            console.log(this.state.savedPosts)   
        })
        .catch(error => console.log(error))
     }
	 // post list edit / delete post handlers
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
            if(this.state.savedPosts.length - 1 === 0){
                this.setState({savedPosts: updatedPosts, hasPosts: false})
            } else {
                this.setState({savedPosts: updatedPosts})
            }
            this.savedPosts = updatedPosts
        })
        .catch((e) => console.log(e))
     }
	// check database foor existing posts
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
	render () {
		return (
		<AuxWrapper>
			<Toolbar drawerToggleClicked={this.sideDrawerToggleHandle} />
			<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
			<main className={classes.Content}>
			<PostCreate
                 titleChanged={this.titleChangedHandler} 
                 contentChanged={this.contentChangedHandler} 
                 savePost={this.savePostHandler} />
                <PostList hasPosts={this.state.hasPosts}>
                    {this.state.savedPosts}
                </PostList>
			</main>
		</AuxWrapper>
		)}
}
export default Layout;