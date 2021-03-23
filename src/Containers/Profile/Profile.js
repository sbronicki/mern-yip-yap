import { Component } from 'react';
import Redirect from 'react-router-dom'

import classes from './Profile.module.css';
import ProfilePostList from '../Posts/PostList/ProfilePostList'
// import Button from '../../Components/UI/Button/Button';
// import BrandPFP from '../../Assets/img/PFP.jpg'
// import BrandHeader from '../../Assets/img/yipyaplogobannerPNG.png'


// import HeaderPFPContainer from './HeaderPFPContainer/HeaderPFPContainer'
// import PostsSection from './PostsSection/PostsSection';

class Profile extends Component {
	render() {
		console.log(this.props)
		return  (
			<div className={classes.Profile}>
				{/* <img className={classes.Header} style={this.props.displayHeader ? null : {display: 'none'}} src={this.props.headerImg ? this.props.headerImg : BrandHeader} alt="Logo Header!"/>
				<img className={classes.PFP} src={this.props.userPFP ? this.props.userPFP : BrandPFP} alt="imageee" /> */}
				<p className={classes.Username}>{this.props.username ? this.props.username : 'Yip-Yap'}</p>
				{/* <Button btnType='Edit-Follow' >Follow</Button> */}
				<h3 className={classes.PostsHeader}>{this.props.username ? this.props.username + `'s Yaps-` : `Yips-Yap's ~ Yip Yaps-`}</h3>
        		<div className={classes.PostListContainer}>
					<ProfilePostList />
				</div>
			</div>
		);
	}
}

export default Profile;