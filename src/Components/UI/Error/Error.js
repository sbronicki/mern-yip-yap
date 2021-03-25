import classes from './Error.module.css'

const error = (props) => (
    <div className={classes.Error}>
        <p>ERROR STATUS({props.errorStatus})</p>
        <p>{props.errorMessage}</p>
    </div>
)

export default error