import axios from 'axios'

import * as actionTypes from './actionTypes';

// save post
export const savePostStart = () => {
    return {
        type: actionTypes.SAVE_POST_START,
        loading: true
    }
}
export const savePostSuccess = () => {
    return {
        type: actionTypes.SAVE_POST_SUCCESS,
        error: false,
        loading: false
    }
}
export const savePostFail = (errorStatus, errorMessage) => {
    return {
        type: actionTypes.SAVE_POST_FAIL,
        loading: false,
        errorStatus: errorStatus,
        errorMessage: errorMessage
    }
}
export const savePost = (postData) => {
    return dispatch => {
        dispatch(savePostStart())
        axios
        .post('/api/posts', postData)
        .then(response => {
            dispatch(savePostSuccess())
        })
        .catch(err => {
           if(err.response) {
                const error = {
                    status: err.response.request.status,
                    message: err.response.data.error.message
                }
            dispatch(savePostFail(error.status, error.message))
           }
           dispatch(savePostFail(503, 'server error :('))
        })
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
export const getPostToUpdateFail = (errorStatus, errorMessage) => {
    return {
        type: actionTypes.GET_POST_TO_UPDATE_FAIL,
        errorStatus: errorStatus,
        errorMessage: errorMessage,
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
        .catch(err => {
            if(err.response) {
                 const error = {
                     status: err.response.request.status,
                     message: err.response.data.error.message
                 }
             dispatch(getPostToUpdateFail(error.status, error.message))
             return
            }
            dispatch(getPostToUpdateFail(503, 'server error :('))
         })
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
export const updatePostFail = (errorStatus, errorMessage) => {
    return {
        type: actionTypes.UPDATE_POST_FAIL,
        error: true,
        errorStatus: errorStatus,
        errorMessage: errorMessage,
        loading: false
    }
}
export const updatePost = (post) => {
    return dispatch => {
        dispatch(updatePostStart())
        axios
			.put('/api/posts/' + post.id, post)
			.then((response) => {
				dispatch(updatePostSuccess(response))
			})
			.catch(err => {
                if(err.response) {
                     const error = {
                         status: err.response.request.status,
                         message: err.response.data.error.message
                     }
                 dispatch(updatePostFail(error.status, error.message))
                 return
                }
                dispatch(updatePostFail(503, 'server error :('))
             })
    }
}