import classes from './Error.module.css'

const error = (props) => (
    <div className={classes.error}>
        <p>{props.errorMessage}</p>
    </div>
)

export default error