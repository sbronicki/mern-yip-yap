import classes from './ImageTooBigMessage.module.css'

const imageTooBigMessage = (props) => (
    props.displayimageTooBigMessage ?
    <div className={classes.ImageTooBigMessage}>
        <p>Image too big!</p>
    </div> : null
)

export default imageTooBigMessage