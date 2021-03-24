import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
 
import classes from './Auth.module.css';
import Spinner from '../../Components/UI/Spinner/Spinner'
import Error from '../../Components/UI/Error/Error'
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/index';

class Auth extends Component {
	state = {
		isSignup: true
	};
	submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.username, this.state.isSignup)
	};
	onInputChangeHandler = (e) => {
		if (e.target.id === 'emailInput') {
			this.setState({ email: e.target.value });
		} else if (e.target.id === 'passwordInput') {
			this.setState({ password: e.target.value });
		}else if (e.target.id === 'usernameInput') {
			this.setState({ username: e.target.value });
		}
		if (this.state.disabled) {
			if (this.state.email.includes('@') && this.state.password.length >= 8) {
				this.setState({ disabled: false });
			}
		}
	};
	componentDidMount() {
		if (this.props.match.url === '/signup') {
			this.setState({ isSignup: true });
		} else if (this.props.match.url === '/login') {
			this.setState({ isSignup: false });
		}
	}
	render() {
		let authRedirect = null 
		if(this.props.isAuthenticated) {
			authRedirect = <Redirect to='/' />
		}
		return (
			<div className={classes.Auth}>
				{authRedirect}
                {this.props.error ? <Error errorStatus={this.props.errorStatus} errorMessage={this.props.errorMessage} /> : null}
                {!this.props.loading ? 
                <form onSubmit={this.submitHandler}>
					<div style={this.state.isSignup ? null : {display: 'none'}} className={classes.Username}>
						<Input
							id="usernameInput" 
							placeholder="Username" 
							onChange={this.onInputChangeHandler} />
					</div>
					<Input 
						id="emailInput"
						type="email"
						placeholder="Email"
						onChange={this.onInputChangeHandler} />
					<Input
						id="passwordInput"
						type="password"
						placeholder="Password"
						onChange={this.onInputChangeHandler}/>
					<Button btnType="Login">{this.state.isSignup ? 'Sign up' : 'Log in'}</Button>
           		</form> : <Spinner showSpinner={this.props.loading} />}
			</div>
		);
	}
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
		error: state.auth.error,
        errorStatus: state.auth.errorStatus,
        errorMessage: state.auth.errorMessage,
        token: state.auth.token,
        userId: state.auth.userId,
		isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToprops = dispatch => {
	return {
		onAuth: (email, password, username, isSignup) => dispatch(actions.auth(email, password, username, isSignup))
	};
};

export default connect(mapStateToProps, mapDispatchToprops)(Auth);