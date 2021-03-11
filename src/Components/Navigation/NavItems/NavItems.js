import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'


const navItems = (props) => {
    const navItemToggleSideDrawer = () => (
        console.log('close side drawer')
    )
    return (
    props.LoggedIn ? 
        <ul className={classes.NavItems}>
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF="/new-post" NavItemTitle={'New Post'} />
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF="/profile" NavItemTitle={'Profile'} />
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF="/feed" NavItemTitle={'Feed'} />
        </ul> : 
        <ul className={classes.NavItems}>
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF='signup' NavItemTitle='Sign up' />
            <NavItem clicked={navItemToggleSideDrawer} NavItemHREF='/login' NavItemTitle='Log in' />
        </ul>
)}

export default navItems