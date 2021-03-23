// eslint-disable-next-line no-unused-vars
import {Router, Link} from 'react-router-dom'
// import { BsPersonSquare } from 'react-icons/bs'
import { IoPersonCircleOutline } from 'react-icons/io5'
import ToolbarIcon from '../../../Assets/img/yip-yap-logo-png.png'

import classes from './Toolbar.module.css'

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header username={props.username} className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
            <Link to='/'>
             <img src={ToolbarIcon} alt=""/>
            </Link>
            <Link to={`/profile/${props.username ? props.username : 'YipYap'}`}>
                 <IoPersonCircleOutline size='3em' color="#fff" />
            </Link>
    </header>
)

export default toolbar

