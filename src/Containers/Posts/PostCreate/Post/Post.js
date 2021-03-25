import { Link } from 'react-router-dom'

import classes from './Post.module.css'
import Button from '../../../../Components/UI/Button/Button'
// import AuxWrapper from '../../../../HOC/AuxWrapper'

const post = (props) => (
    <li id={props.id} className={classes.Post}>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        {props.image ? <img src={props.image} alt={props.title + 'image'}/> : null}
        <div style={props.usersPosts ? null : {display:'none'}} className={classes.ButtonContainer}>
            <Button btnType="Delete" clicked={props.deletePost}>Delete</Button>
            <Link to={'/edit-post/' + props.id}><Button btnType="Edit" clicked={props.editPost}>Edit</Button></Link>

            {/* {props.usersPosts ? 
                <AuxWrapper>
                    <Button btnType="Delete" clicked={props.deletePost}>Delete</Button>
                    <Link to={'/edit-post/' + props.id}><Button btnType="Edit" clicked={props.editPost}>Edit</Button></Link>
                </AuxWrapper> : <p>from {props.creatorUsername}</p> } */}
        </div>
    </li>
)

export default post