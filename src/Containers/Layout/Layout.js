import { Component } from 'react'
import { Route } from 'react-router-dom'

import classes from './Layout.module.css'
import Home from '../../Components/Home/Home'
import AuxWrapper from '../../HOC/AuxWrapper'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import PostCreate from '../Posts/PostCreate/PostCreate'
import PostList from '../Posts/PostList/PostList'
import Auth from '../Auth/Auth'

class Layout extends Component {
	state = {
		showSideDrawer: false,
		hasPosts: false,
        savedPosts: []
	}
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
				<Route path='/signup' btnType='Sign up' exact component={Auth} />
				<Route path='/login' exact component={Auth} />
				<Route path='/new-post' exact component={PostCreate} />
				<Route path='/edit-post/:id' component={PostCreate} />
				<Route path='/feed' exact component={PostList} />
			</main>
		</AuxWrapper>
		)}
}
export default Layout;