import { Component } from 'react';

import classes from './Profile.module.css';
import ProfilePostList from '../Posts/PostList/ProfilePostList'
// import Button from '../../Components/UI/Button/Button';
// import BrandPFP from '../../Assets/img/PFP.jpg'
// import BrandHeader from '../../Assets/img/yipyaplogobannerPNG.png'


// import HeaderPFPContainer from './HeaderPFPContainer/HeaderPFPContainer'
// import PostsSection from './PostsSection/PostsSection';

class Profile extends Component {
	render() {
		return  (
			<div className={classes.Profile}>
				{/* <img className={classes.Header} style={this.props.displayHeader ? null : {display: 'none'}} src={this.props.headerImg ? this.props.headerImg : BrandHeader} alt="Logo Header!"/>
				<img className={classes.PFP} src={this.props.userPFP ? this.props.userPFP : BrandPFP} alt="imageee" /> */}
				<p className={classes.Username}>{this.props.match.params.username ? this.props.match.params.username : 'Yip-Yap-Team'}</p>
				{/* <Button btnType='Edit-Follow' >Follow</Button> */}
				<h3 className={classes.PostsHeader}>{this.props.match.params.username ? this.props.match.params.username + `'s yaps-` : `Yips-Yap-Team's ~ Yip Yaps-`}</h3>
        		<div className={classes.PostListContainer}>
					<ProfilePostList key={this.props.match.params.username} profile={this.props.match.params.username} />
				</div>
			</div>
		);
	}
}

export default Profile;