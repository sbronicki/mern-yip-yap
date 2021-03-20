import { Component } from 'react';
import classes from './Profile.module.css';
import BrandProfile from './BrandProfile/BrandProfile';
import PFP from './PFP/PFP';
import Header from './Header/Header';
import PostsSection from './PostsSection/PostsSection';

class Profile extends Component {
	render() {
		return !this.props.loggedin ? (
			<div>
				<BrandProfile />
			</div>
		) : (
			<div className={classes.Profile}>
				<PFP />
				<Header />
				<PostsSection />
			</div>
		);
	}
}

export default Profile;