import { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Layout.module.css';
import Home from '../../Components/Home/Home';
import AuxWrapper from '../../HOC/AuxWrapper';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import PostCreate from '../Posts/PostCreate/PostCreate';
import PostList from '../Posts/PostList/PostList';
import Auth from '../Auth/Auth';
import Profile from '../../Components/Profile/Profile';
import Footer from '../../Components/Footer/Footer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
		hasPosts: false,
		savedPosts: []
	};
	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};
	sideDrawerToggleHandle = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};
	render() {
		return (
			<AuxWrapper className={classes.Layout}>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandle} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					<Route path="/" exact component={Home} />
					<Route path="/user/signup" btnType="Sign up" exact component={Auth} />
					<Route path="/user/profile" exact component={Profile} />
					<Route path="/user/login" exact component={Auth} />
					<Route path="/user/new-post" exact component={PostCreate} />
					<Route path="/edit-post/:id" component={PostCreate} />
					<Route path="/user/feed" exact component={PostList} />
					<Route path="/" exact component={Footer} />
				</main>
			</AuxWrapper>
		);
	}
}
export default Layout;