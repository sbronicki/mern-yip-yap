import axios from 'axios'

import * as actionTypes from './actionTypes'

// get posts
//need get post loading
export const getPostsSuccess = (posts) => {
   return {
        type: actionTypes.GET_POSTS_SUCCESS,
        posts: posts
   }
}
export const getPostsFail = () => {
    return {
        type: actionTypes.GET_POSTS_FAIL
    }
}
export const getPosts = () => {
    return dispatch => {
        axios
        .get('/posts')
        .then(response => {
            dispatch(getPostsSuccess(response.data.posts))
        })
        .catch(error => {
            dispatch(getPostsFail())
        });
    }
}

// delete post
// need delete post loading
export const deletePostSuccess = (response) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        postId: response.config.url.substr(7)
    }
}
export const deletePostFail = (response) => {
    return {
        type: actionTypes.DELETE_POST_FAIL
    }
}
export const deletePost = (postId) => {
    return dispatch => {
        axios
        .delete('/posts/' + postId)
        .then((response) => {
           dispatch(deletePostSuccess(response))
        })
        .catch((e) => dispatch(console.log(e)))
    }
}