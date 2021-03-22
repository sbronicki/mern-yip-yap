import axios from 'axios'

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};
export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId  
	};
};
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}
export const auth = (email, password, isSignup) => {
	return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password
        }
        let url = '/api/user/signup'
        if(!isSignup) {
            url = '/api/user/login'
        }
        axios.post(url, authData)
        .then(response => {
            // this is token if logging in 
            dispatch(authSuccess(response.data.token, response.data.localId))
            if(!isSignup){
                dispatch(checkAuthTimeout(response.data.expiresIn))
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err))
        })
	};
};