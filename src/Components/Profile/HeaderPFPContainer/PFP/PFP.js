import classes from './PFP.module.css';
import Button from '../../../UI/Button/Button';
import BrandPFP from '../../../../Assets/img/PFP.jpg'

const PFP = (props) => (
	<div className={classes.PFP}>
		<img src={props.userPFP ? props.userPFP : BrandPFP} alt="imageee" />
		<p>{props.userName ? props.userName : 'Yip-Yap'}</p>
		<Button btnType='EditProfile' >Edit profile</Button>
	</div>
)

export default PFP;