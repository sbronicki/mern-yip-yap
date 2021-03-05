import { Router, Link } from 'react-router-dom'

import classes from './NavItem.module.css'

const navItem = (props) => (
    <li className={classes.NavItem}>
        <Link to={props.NavItemHREF}>{props.NavItemTitle}</Link>
    </li>
)

export default navItem