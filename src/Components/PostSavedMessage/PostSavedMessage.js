import classes from './PostSavedMessage.module.css'

const postSavedMessage = (props) => (
    props.displaySavedPostMessage ?
    <div className={classes.PostSavedMessage}>
        <p>Post {props.saveType} successful!</p>
    </div> : null
)

export default postSavedMessage