import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import { BsPencilSquare } from 'react-icons/bs'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
         <nav className={classes.DesktopOnly}>
           <NavItems />
        </nav>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <div>
            <BsPencilSquare size='2.5em' color="#fff" />
        </div>
    </header>
)

export default toolbar

