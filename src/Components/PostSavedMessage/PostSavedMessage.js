import classes from './PostSavedMessage.module.css'

const postSavedMessage = (props) => (
    props.displaySavedPostMessage ?
    <div className={classes.PostSavedMessage}>
        <p>Post save successful!</p>
    </div> : null
)

export default postSavedMessage