import { Component } from 'react'

import classes from './Layout.module.css'
import AuxWrapper from '../HOC/AuxWrapper'
import Toolbar from '../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../Components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
	state = {
		showSideDrawer: false
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
			<main className={classes.Content}>{this.props.children}</main>
		</AuxWrapper>
		)}
}
export default Layout;