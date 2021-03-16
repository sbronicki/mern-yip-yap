import * as actionTypes from '../actions/actionTypes'

const initialState = {
    posts: [],
    error: false
}

const postListReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_POSTS_SUCCESS:
            return{
                ...state,
                posts: action.posts,
                error: false
            }
        case actionTypes.GET_POSTS_FAIL:
            return{
                ...state,
                error: true
            }
        case actionTypes.DELETE_POST_SUCCESS:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== action.postId)
            }
        case actionTypes.DELETE_POST_FAIL:
            return{
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default postListReducer