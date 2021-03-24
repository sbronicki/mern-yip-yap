import classes from './Spinner.module.css'

const spinner = (props) => (
    <div style={props.showSpinner ? null: {display: 'none'}} className={classes.Spinner}>Loading</div>
)

export default spinner
