import { Router, Link } from 'react-router-dom'

import classes from './Post.module.css'
import Button from '../../../UI/Button/Button'

const post = (props) => (
    <li id={props.id} className={classes.Post}>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <div className={classes.ButtonContainer}>
            <Button btnType="Delete" clicked={props.deletePost}>Delete</Button>
            <Link to={'/edit-post/' + props.id}><Button btnType="Edit" clicked={props.editPost}>Edit</Button></Link>
        </div>
    </li>
)

export default post