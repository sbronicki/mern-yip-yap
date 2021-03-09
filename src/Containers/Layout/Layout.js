import { Component } from 'react'
import { Route } from 'react-router-dom'

import classes from './Layout.module.css'
import Home from '../../Components/Home/Home'
import AuxWrapper from '../../HOC/AuxWrapper'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import PostCreate from '../../Components/Posts/PostCreate/PostCreate'
import PostList from '../../Components/Posts/PostList/PostList'
import Signup from '../Auth/Signup/Signup'
import Login from '../Auth/Login/Login'

class Layout extends Component {
	// initial state
	state = {
		showSideDrawer: false,
		hasPosts: false,
        savedPosts: []
	}
	// side drawer functios
	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}
	sideDrawerToggleHandle = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}
	render () {
		return (
		<AuxWrapper>
			<Toolbar drawerToggleClicked={this.sideDrawerToggleHandle} />
			<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
			<main className={classes.Content}>
				<Route path='/' exact component={Home} />
				<Route path='/signup' btnType='Sign up' exact component={Signup} />
				<Route path='/login' exact component={Login} />
				<Route path='/new-post' exact component={PostCreate} />
				<Route path='/feed' exact component={PostList} />
			</main>
		</AuxWrapper>
		)}
}
export default Layout;