import { Component } from 'react';
import classes from './BrandProfile.module.css';
import PFP from '../PFP/PFP';
import Header from '../Header/Header';
import PostsSection from '../PostsSection/PostsSection';

class BrandProfile extends Component {
	render() {
		return (
			<div className={classes.Profile}>
				<PFP />
				<Header />
				<PostsSection />
			</div>
		);
	}
}

export default BrandProfile;