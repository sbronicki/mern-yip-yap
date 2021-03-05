import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'


const navItems = (props) => (
        <ul className={classes.NavItems}>
            <NavItem NavItemHREF="/new-post" NavItemTitle={'New Post'} />
            <NavItem NavItemHREF="/" NavItemTitle={'Profile'} />
            <NavItem NavItemHREF="/feed" NavItemTitle={'Feed'} />
        </ul>
)

export default navItems