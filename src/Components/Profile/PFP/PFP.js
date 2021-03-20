import { Component } from 'react';

import classes from './PFP.module.css';
import Button from '../../UI/Button/Button';

class PFP extends Component {
	render() {
		return (
			<div className={classes.PFP}>
				<img alt="imageee" />
				<Button>Edit profile</Button>
			</div>
		);
	}
}

export default PFP;