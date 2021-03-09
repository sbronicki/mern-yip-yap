import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'


const navItems = (props) => (
    props.LoggedIn ? 
        <ul className={classes.NavItems}>
            <NavItem NavItemHREF="/new-post" NavItemTitle={'New Post'} />
            <NavItem NavItemHREF="/profile" NavItemTitle={'Profile'} />
            <NavItem NavItemHREF="/feed" NavItemTitle={'Feed'} />
        </ul> : 
        <ul className={classes.NavItems}>
            <NavItem NavItemHREF='signup' NavItemTitle='Sign up' />
            <NavItem NavItemHREF='/login' NavItemTitle='Log in' />
        </ul>
)

export default navItems