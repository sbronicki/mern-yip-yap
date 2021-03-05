import { Component } from 'react'
import axios from 'axios'

import classes from './PostCreate.module.css'
import Button from '../../UI/Button/Button'

class PostCreate extends Component {
    state = {
        title: '',
        content: ''
    }
    savePostHandler = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
        };
        axios
        .post('http://localhost:4200/posts', data)
        .then(response => {
                console.log(response);
            });
    }
    render() {
        return(
            <div className={classes.PostCreate}>
                <input type="text" placeholder="Post Title" onChange={(event) => this.setState({title: event.target.value})} />
                <textarea cols="30" rows="6" placeholder="Post Content" onChange={(event) => this.setState({content: event.target.value})} />
                <Button clicked={this.savePostHandler} btnType='SavePost'>Save Post</Button>
            </div>
        )
    }
}
export default PostCreate