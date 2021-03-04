import classes from './PostList.module.css'

const postList = (props) => (
    <ul className={classes.PostList}>
        {props.hasPosts ? props.children : <p>NO POSTS ADDED YET!!!</p>}
    </ul>
)

export default postList