import classes from './Home.module.css' 
import Logo from '../Logo/Logo'
import NavItems from '../Navigation/NavItems/NavItems'

const home = () => (
    <div className={classes.Home}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.NavItems}>
            <NavItems />
        </nav>
    </div>
)

export default home