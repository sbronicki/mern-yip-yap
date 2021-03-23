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
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationDate) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationDate * 1000)
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
            const token = response.data.token
            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', token)
            localStorage.setItem('userId', response.data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token, response.data.localId))
            if(!isSignup){
                dispatch(checkAuthTimeout(response.data.expiresIn))
            }
        })
        .catch(err => {
            console.log(err)
            // dispatch(authFail(err))
        })
	};
};
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()) {
                dispatch(logout())
            }else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}