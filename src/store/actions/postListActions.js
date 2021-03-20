import axios from 'axios'

import * as actionTypes from './actionTypes';

// load saved posts
export const getPostsStart = () => {
    return {
        type: actionTypes.GET_POSTS_START
    }
}
export const getPostsSuccess = (posts) => {
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        posts: posts
    }
}
export const getPostsFail = (error) => {
    return {
        type: actionTypes.GET_POSTS_FAIL,
        error: error
    }
}
export const getPosts = () => {
    return dispatch => {
        dispatch(getPostsStart())
        axios
			.get('/posts')
			.then((response) => {
                dispatch(getPostsSuccess(response.data.posts))
			})
			.catch((error) => {
				dispatch(getPostsFail(error))
			});
    }
}
// delete posts 
export const deletePostStart = () => {
    return {
        type: actionTypes.DELETE_POST_START
    }
}
export const deletePostSuccess = (response) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        postId: response.config.url.substr(7)
    }
}
export const deletePostFail = (error) => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        error: error
    }
}
export const deletePost = (postId) => {
    return dispatch => {
        dispatch(deletePostStart())
        	axios
			.delete('/posts/' + postId)
			.then((response) => {
                dispatch(deletePostSuccess(response))
			})
			.catch((error) => {
                dispatch(deletePostFail(error))
            });

    }
}