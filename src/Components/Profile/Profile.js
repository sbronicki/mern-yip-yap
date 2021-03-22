import { Component } from 'react';
import classes from './Profile.module.css';
import HeaderPFPContainer from './HeaderPFPContainer/HeaderPFPContainer'
import PostsSection from './PostsSection/PostsSection';

class Profile extends Component {
	render() {
		return  (
			<div className={classes.Profile}>
				<HeaderPFPContainer />
				<PostsSection />
			</div>
		);
	}
}

export default Profile;