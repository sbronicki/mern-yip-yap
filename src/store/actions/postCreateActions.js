import axios from 'axios'

import * as actionTypes from './actionTypes'

//need save post loading

// save new post 
export const savePostSucess = (responseData, postData) => {
    return {
        type: actionTypes.SAVE_POST_SUCCESS,
        postId: responseData.postId,
        postData: postData
    }
}
export const savePostFail = (responseData) => {
    return {
        type: actionTypes.SAVE_POST_FAIL
    }
}
export const savePost = (postData) => {
    return dispatch => {
        axios
        .post('/posts', postData)
        .then(response => {
            dispatch(savePostSucess(response.data, postData))
            })
        .catch(error => dispatch(savePostFail()))
    }
}
//get post to update
export const getPostToUpdateSucces = (responseData, postId) => {
    return {
        type: actionTypes.GET_POST_TO_UPDATE_SUCCESS,
        postData: responseData,
        postId: postId
    }
}
export const getPostToUpdateFail = (response) => {
    return {
        type: actionTypes.GET_POST_TO_UPDATE_FAIL
    }
}
export const getPostToUpdate = (postId) => {
    return dispatch => {
        axios
        .get('/posts/' + postId)
        .then(response => {
            dispatch(getPostToUpdateSucces(response.data, postId))
        })
        .catch(error => dispatch(getPostToUpdateFail()))
    }
}
//update post
export const updatePostSucces = (responseData, postId) => {
    return {
        type: actionTypes.UPDATE_POST_SUCCESS,
        postData: responseData,
        postId: postId
    }
}
export const updatePostFail = (response) => {
    return {
        type: actionTypes.UPDATE_POST_FAIL
    }
}
export const updatePost = (postId) => {
    return dispatch => {
        axios
        .get('/posts/' + postId)
        .then(response => {
            dispatch(updatePostSucces(response.data, postId))
        })
        .catch(error => dispatch(updatePostFail()))
    }
}