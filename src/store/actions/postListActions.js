import axios from 'axios'

import * as actionTypes from './actionTypes';

// load saved posts
export const getPostsStart = () => {
    return {
        type: actionTypes.GET_POSTS_START
    }
}
export const getPostsSuccess = posts => {
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        posts: posts
    }
}
export const getPostsFail = (errorStatus, errorMessage) => {
    return {
        type: actionTypes.GET_POSTS_FAIL,
        errorStatus: errorStatus,
        errorMessage: errorMessage
    }
}
export const getPosts = () => {
    return dispatch => {
        dispatch(getPostsStart())
        axios
			.get('/api/posts')
			.then(response => {
                dispatch(getPostsSuccess(response.data.posts))
			})
			.catch(err => {
                if(err.response) {
                     const error = {
                         status: err.response.request.status,
                         message: err.response.data.error.message
                     }
                 dispatch(getPostsFail(error.status, error.message))
                 return
                }
                dispatch(getPostsFail(503, 'server error :('))
             })
    }
}
// load specific user posts
export const getUserPosts = (user) => {
    return dispatch => {
        dispatch(getPostsStart())
        if(!user) user = 'Yip-Yap-Team'
        axios
            .get('/api/posts')
            .then(response => {
               const userPosts = response.data.posts.filter(post => post.username === user)
               dispatch(getPostsSuccess(userPosts))
            })
            .catch(err => {
                if(err.response) {
                     const error = {
                         status: err.response.request.status,
                         message: err.response.data.error.message
                     }
                 dispatch(getPostsFail(error.status, error.message))
                 return
                }
                dispatch(getPostsFail(503, 'server error :('))
             })
    }
}
// delete posts 
export const deletePostStart = () => {
    return {
        type: actionTypes.DELETE_POST_START
    }
}
export const deletePostSuccess = response => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        postId: response.config.url.substr(11)
    }
}
export const deletePostFail = (errorStatus, errorMessage) => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        errorStatus: errorStatus,
        errorMessage: errorMessage
    }
}
export const deletePost = postId => {
    return dispatch => {
        dispatch(deletePostStart())
        	axios
			.delete('/api/posts/' + postId)
			.then(response => {
                dispatch(deletePostSuccess(response))
			})
			.catch(err => {
                if(err.response) {
                     const error = {
                         status: err.response.request.status,
                         message: err.response.data.error.message
                     }
                 dispatch(deletePostFail(error.status, error.message))
                 return
                }
                dispatch(deletePostFail(503, 'server error :('))
             })

    }
}