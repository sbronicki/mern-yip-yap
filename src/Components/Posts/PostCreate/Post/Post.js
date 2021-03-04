import classes from './Post.module.css'

const post = (props) => (
    <li className={classes.Post}>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
    </li>
)


export default post