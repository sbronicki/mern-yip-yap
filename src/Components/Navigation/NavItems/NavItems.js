import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'


const navItems = (props) => (
        <ul className={classes.NavItems}>
            <NavItem NavItemHREF="/" NavItemTitle={'Profile'} />
            <NavItem NavItemTitle={'Lists'} />
            <NavItem NavItemTitle={'Topics'} />
            <NavItem NavItemTitle={'Bookmarks'} />
            <NavItem NavItemTitle={'Moments'} />
            <NavItem NavItemTitle={'Follower requests'} />
        </ul>
)

export default navItems