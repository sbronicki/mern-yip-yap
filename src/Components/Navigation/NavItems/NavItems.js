import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'


const navItems = (props) => (
        <ul className={classes.NavItems}>
            <NavItem NavItemHREF="/" NavItemTitle={'New Post'} />
            <NavItem NavItemHREF="/" NavItemTitle={'Profile'} />
            <NavItem NavItemHREF="/" NavItemTitle={'Feed'} />
        </ul>
)

export default navItems