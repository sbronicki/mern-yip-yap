import * as actionTypes from '../actions/actionTypes'

const initialState = { 
    post: {
        title: '',
        content: '',
        id: '',
        image: null,
        imagePreview: null,
        disabled: true,
        editMode: false
    },
    error: false
 }

 const postCreateReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SAVE_POST_SUCCESS:
            return{
                ...state,
                ...state.post,
                error: false
            }
        case actionTypes.SAVE_POST_FAIL:
            return{
                ...state,
                ...state.post,
                error: true
            }
        case actionTypes.GET_POST_TO_UPDATE_SUCCESS: 
            return {
                ...state,
                ...state.post,
                post: action.postData.posts,
                imagePreview: null,
                disabled: true,
                editMode: false,
                error: false
            }
        case actionTypes.GET_POST_TO_UPDATE_FAIL: 
            return {
                ...state,
                error: true
            }
        case actionTypes.UPDATE_POST_SUCCESS: 
            return {
                ...state,
                error: false,
            }
        case actionTypes.UPDATE_POST_FAIL: 
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
 }

 export default postCreateReducer