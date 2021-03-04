import classes from './NavItem.module.css'

const navItem = (props) => (
    <li className={classes.NavItem}>
        <a href={props.NavItemHREF}>{props.NavItemTitle}</a>
    </li>
)

export default navItem