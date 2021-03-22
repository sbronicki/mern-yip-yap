import classes from './PostsSection.module.css';
import PostList from '../../../Containers/Posts/PostList/PostList'

const postSection = (props) => (
    <div className={classes.PostsSection}>
        <p>{props.userName ? props.userName + `'s Yaps` : `Yip-Yap's - Yip Yaps`}</p>
        <PostList />
    </div>
);

export default postSection;