import * as actionTypes from '../actions/actionTypes'

const initialState = {
    error: null,
    loading: false,
    title: null,
    content: null,
    image: null,
    id: null,
    postSaved: false,
    postUpdated: false,
    editMode: false
}

const postCreateReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SAVE_POST_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.SAVE_POST_SUCCESS:
            return{
                ...state,
                error: false,
                loading: false,
                postSaved: true,
                postUpdated: false
            }
        case actionTypes.SAVE_POST_FAIL:
            return{
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.GET_POST_TO_UPDATE_START: 
            return {
                ...state,
                editMode: true, 
                loading: true
            }
        case actionTypes.GET_POST_TO_UPDATE_SUCCESS: 
            return {
                ...state,
                editMode: true, 
                error: false,
                loading: false,
                title: action.title,
                content: action.content,
                image: action.image,
                id: action.id
            }
        case actionTypes.GET_POST_TO_UPDATE_FAIL: 
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.UPDATE_POST_START: 
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_POST_SUCCESS: 
            return {
                ...state,
                error: false,
                loading: false,
                postUpdated: true,
                postSaved: false
            }
        case actionTypes.UPDATE_POST_FAIL: 
            return {
                ...state,
                error: true,
                loading: false
            }
            default:
                return state
        }
}

export default postCreateReducer