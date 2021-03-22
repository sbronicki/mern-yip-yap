import classes from './Header.module.css';
import BrandHeader from '../../../../Assets/img/yipyaplogobannerPNG.png'

const header = (props) => (
    <div style={props.displayHeader ? null : {display: 'none'}} className={classes.Header}>
        <img src={props.headerImg ? props.headerImg : BrandHeader} alt="Logo Header!"/>
    </div>
)

export default header;