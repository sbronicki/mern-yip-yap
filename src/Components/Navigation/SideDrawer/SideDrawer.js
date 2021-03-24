import { Link } from 'react-router-dom';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import AuxWrapper from '../../../HOC/AuxWrapper';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
	let attachedClasses = [ classes.SideDrawer, classes.Close ];
	if (props.open) attachedClasses = [ classes.SideDrawer, classes.Open ];
	return (
		<AuxWrapper>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Link to="/">
						<Logo />
					</Link>
				</div>
				<nav>
					<NavItems username={props.username} isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</AuxWrapper>
	);
};

export default sideDrawer;