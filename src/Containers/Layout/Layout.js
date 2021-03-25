import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import classes from './Layout.module.css';
import Home from '../../Components/Home/Home';
import AuxWrapper from '../../HOC/AuxWrapper';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import PostCreate from '../Posts/PostCreate/PostCreate';
import PostList from '../Posts/PostList/PostList';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import Footer from '../../Components/Footer/Footer';
import Logout from '../Auth/Logout/Logout';

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
		let routes = (
			<AuxWrapper>
				<Toolbar 
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandle} />
				<SideDrawer 
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer} 
					closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					<Route path="/" exact>
						<Home isAuth={this.props.isAuthenticated} />
					</Route>
					<Route path="/signup" btnType="Sign up" exact component={Auth} />
					<Route path="/profile/YipYap" exact component={Profile} />
					<Route path="/login" exact component={Auth} />
					<Route path="/feed" exact component={PostList} />
					<Route path="/" exact component={Footer} />
				</main>
				<Redirect to='/' />
			</AuxWrapper>
		)
		if(this.props.isAuthenticated){
			routes = (
				<AuxWrapper>
					<Toolbar 
						isAuth={this.props.isAuthenticated}
						drawerToggleClicked={this.sideDrawerToggleHandle}
						username={this.props.username} />
					<SideDrawer 
						isAuth={this.props.isAuthenticated}
						open={this.state.showSideDrawer} 
						closed={this.sideDrawerClosedHandler}
						username={this.props.username} />
					<main className={classes.Content}>
						<Route path="/" exact>
							<Home 
								username={this.props.username} 
								isAuth={this.props.isAuthenticated} />
						</Route>
						<Route path="/signup" btnType="Sign up" exact component={Auth} />
						<Route path="/login" exact component={Auth} />

						<Route path="/profile/:username" exact component={Profile} />
						<Route path="/logout" exact component={Logout} />
						<Route path="/new-post" exact component={PostCreate} />
						<Route path="/edit-post/:id" component={PostCreate} />
						<Route path="/feed" exact component={PostList} />
						<Route path="/" exact component={Footer} />
					</main>
				</AuxWrapper>
			)
		}
		return (
			<AuxWrapper className={classes.Layout}>
				{routes}
			</AuxWrapper>
		);
	}
}

const mapStateToProps = state => {
	return {
		// isAuthenticated: state.auth.token ? true : false,
		isAuthenticated: state.auth.token !== null,
		username: state.auth.username
	}
}
export default connect(mapStateToProps)(Layout);