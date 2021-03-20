import * as actionTypes from '../actions/actionTypes'

const initialState = {
    posts: null,
    error: null,
    loading: false
}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_POSTS_START:
            return {
                ...state,
                loading: true
            } 
        case actionTypes.GET_POSTS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                posts: action.posts
            } 
        case actionTypes.GET_POSTS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            } 
        case actionTypes.DELETE_POST_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.DELETE_POST_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                posts: state.posts.filter(post => post._id !== action.postId)
            }
        case actionTypes.DELETE_POST_FAIL:
            return{
                ...state,
                error: true,
                loading: false
            }
        default: 
        return state
    }
}

export default reducer 