import {Component} from 'react'

import classes from './Auth.module.css'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'


class Auth extends Component {
    state={
        mode: null
    }
    componentDidMount() {
        if(this.props.match.url === '/signup'){
            this.setState({mode: 'signup'})
        }else if (this.props.match.url === '/login'){
            this.setState({mode: 'login'})
        }
    }

    render() {
        return(
        <div className={classes.Auth}>
            <Input 
                type="email" 
                placeholder="Email"
                onChange={(e) => this.savedPost.title = e.target.value} />
            <Input 
                type='password'
                placeholder="Password" 
                onChange={(e) => this.savedPost.content = e.target.value} />
            <Button btnType='Login'>
                {this.state.mode === 'signup' ? 'Sign up' : 'Log in'}
            </Button>
        </div>
        )
    }
}

export default Auth