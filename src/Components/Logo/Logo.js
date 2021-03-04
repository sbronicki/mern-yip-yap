import yipyapLogo from '../../Assets/img/yip-yap-temp-logo.jpg'
import classes from './Logo.module.css' 

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={yipyapLogo} alt="corgi"/>
    </div>
)

export default logo