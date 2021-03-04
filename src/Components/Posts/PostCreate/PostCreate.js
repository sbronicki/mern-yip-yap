import classes from './PostCreate.module.css'
import Button from '../../UI/Button/Button'

const postCreate = (props) => {
    return(
    <div className={classes.PostCreate}>
        <input type="text" placeholder="Post Title" onChange={props.titleChanged} />
        <textarea name="postContent" cols="30" rows="6" placeholder="Post Content" onChange={props.contentChanged} />
        <Button clicked={props.savePost} btnType='SavePost'>Save Post</Button>
    </div>
)}

export default postCreate