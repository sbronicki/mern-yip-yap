import classes from './Home.module.css';
import Logo from '../Logo/Logo';
import NavItems from '../Navigation/NavItems/NavItems';

const home = (props) => (
	<div className={classes.Home}>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.NavItems}>
			<NavItems />
		</nav>
	</div>
);

export default home;

// in NavItems tag => LoggedIn={this.state.loggedIn} something like that probably use redux instead tho