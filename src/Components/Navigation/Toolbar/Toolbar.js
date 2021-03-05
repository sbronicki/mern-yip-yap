import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
// import { BsPersonSquare } from 'react-icons/bs'
import { IoPersonCircleOutline } from 'react-icons/io5'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <div className={classes.icon}>
            <IoPersonCircleOutline size='3em' color="#fff" />
        </div>
    </header>
)

export default toolbar

