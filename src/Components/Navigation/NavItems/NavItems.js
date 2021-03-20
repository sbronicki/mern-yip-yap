import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'


const navItems = (props) => {
    const navItemToggleSideDrawer = () => (
        console.log('close side drawer')
    )
    return (
    props.LoggedIn ? 
        <ul className={classes.NavItems}>
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF="/user/new-post" NavItemTitle={'New Post'} />
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF="/user/profile" NavItemTitle={'Profile'} />
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF="/user/feed" NavItemTitle={'Feed'} />
        </ul> : 
        <ul className={classes.NavItems}>
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF='/user/signup' NavItemTitle='Sign up' />
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF='/user/login' NavItemTitle='Log in' />
        </ul>
)}

export default navItems