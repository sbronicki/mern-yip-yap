/* eslint-disable no-unused-vars */
import {Router, Link} from 'react-router-dom'
// import { BsPersonSquare } from 'react-icons/bs'
import { IoPersonCircleOutline } from 'react-icons/io5'

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Link to='/'><Logo /></Link>
        </div>
        <div className={classes.icon}>
            <Link to='/profile'>
                 <IoPersonCircleOutline size='3em' color="#fff" />
            </Link>
        </div>
    </header>
)

export default toolbar

