import axios from 'axios'

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};
export const authSuccess = (token, userId, username) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        username: username
	};
};
export const authFail = (errorStatus, errorMessage) => {
	return {
		type: actionTypes.AUTH_FAIL,
		errorStatus: errorStatus,
        errorMessage: errorMessage
	};
};
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
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
export const auth = (email, password, username, isSignup) => {
	return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password,
            username: username
        }
        let url = '/api/user/signup'
        if(!isSignup) {
            url = '/api/user/login'
            axios.post(url, authData)
            .then(response => {
                const token = response.data.token
                const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('username', response.data.username)
                dispatch(authSuccess(token, response.data.userId, response.data.username))
                if(!isSignup){
                    dispatch(checkAuthTimeout(response.data.expiresIn))
                }
            })
            .catch(err => {
                console.log(err.response)
               if(err.response) {
                    const error = {
                        status: err.response.request.status,
                        message: err.response.data.message
                    }
                dispatch(authFail(error.status, error.message))
                return
               }
               dispatch(authFail(503, 'server error :('))
            })
            return
        }
        axios.post(url, authData)
        .then(response => {
            dispatch(authSuccess(null, null, null))
        })
        .catch(err => {
           if(err.response) {
                const error = {
                    status: err.response.request.status,
                    message: err.response.data.error.message
                }
            dispatch(authFail(error.status, error.message))
            return
           }
           dispatch(authFail(503, 'server error :('))
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
                const username = localStorage.getItem('username')
                dispatch(authSuccess(token, userId, username))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}