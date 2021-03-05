import classes from './Post.module.css'
import Button from '../../../UI/Button/Button'

const post = (props) => (
    <li id={props.id} className={classes.Post}>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <div className={classes.ButtonContainer}>
            <Button btnType="Delete" clicked={props.deletePost}>Delete</Button>
            <Button btnType="Edit" clicked={props.editPost}>Edit</Button>
        </div>
    </li>
)


export default post