import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;

    switch(props.inputtype){
        case('input'):
            inputElement = <input maxLength="50" ref={props.reference} className={classes.InputElement} {...props} />
            break
        case('textarea'): 
            inputElement = <textarea maxLength="256" className={classes.InputElement} {...props} />
            break
        default:
            inputElement = <input maxLength="50" className={classes.InputElement} {...props} />
            break
    }
    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    )
}

export default input