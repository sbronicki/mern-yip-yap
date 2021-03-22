import axios from 'axios'

import * as actionTypes from './actionTypes';

// save post
export const savePostStart = () => {
    return {
        type: actionTypes.SAVE_POST_START,
        loading: true
    }
}
export const savePostSuccess = (responseData) => {
    return {
        type: actionTypes.SAVE_POST_SUCCESS,
        error: false,
        loading: false
    }
}
export const savePostFail = (error) => {
    return {
        type: actionTypes.SAVE_POST_FAIL,
        loading: false,
        error: error
    }
}
export const savePost = (postData) => {
    return dispatch => {
        dispatch(savePostStart())
        axios
        .post('/api/posts', postData)
        .then(response => {
            dispatch(savePostSuccess(response.data))
            })
        .catch(error => dispatch(savePostFail()))
    }
}
// get post to update 
export const getPostToUpdateStart = () => {
    return {
        type: actionTypes.GET_POST_TO_UPDATE_START,
        loading: true
    }
}
export const getPostToUpdateSuccess = (responseData) => {
    return {
        type: actionTypes.GET_POST_TO_UPDATE_SUCCESS,
        title: responseData.title,
        content: responseData.content,
        id: responseData._id,
        loading: false,
        error: false,
        image: responseData.image
    }
}
export const getPostToUpdateFail = (error) => {
    return {
        type: actionTypes.GET_POST_TO_UPDATE_FAIL,
        error: error,
        loading: false
    }
}
export const getPostToUpdate = (postId) => {
    return dispatch => {
        dispatch(getPostToUpdateStart())
        axios
        .get('/api/posts/' + postId)
        .then(response => {
            dispatch(getPostToUpdateSuccess(response.data.posts))
        })
        .catch(error => dispatch(getPostToUpdateFail(error)))
    }
}

// update post
export const updatePostStart = () => {
    return {
        type: actionTypes.UPDATE_POST_START,
        loading: true
    }
}
export const updatePostSuccess = (post) => {
    return {
        type: actionTypes.UPDATE_POST_SUCCESS,
        loading: false,
        error: false,
    }
}
export const updatePostFail = () => {
    return {
        type: actionTypes.UPDATE_POST_FAIL,
        error: true,
        loading: false
    }
}
export const updatePost = (post) => {
    return dispatch => {
        dispatch(updatePostStart())
        console.log(post)
        axios
			.put('/api/posts/' + post.id, post)
			.then((response) => {
                console.log(response)
				dispatch(updatePostSuccess(response))
			})
			.catch((error) => dispatch(updatePostFail(error)));
    }
}