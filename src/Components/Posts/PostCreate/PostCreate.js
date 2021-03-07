import { Component } from 'react'
import axios from 'axios'

import classes from './PostCreate.module.css'
import Button from '../../UI/Button/Button'

class PostCreate extends Component {
    savedPost = { 
        title: '',
        content: ''
     }
    savePostHandler = () => {
        const inputElement = document.getElementById('inputId')
        const textAreaElement = document.getElementById('textAreaId')

        axios
        .post('http://localhost:4200/posts', this.savedPost)
        .then(response => {
            inputElement.value = ''
            textAreaElement.value = ''
            });
    }
    render() {
        return(
            <div className={classes.PostCreate}>
                <input id='inputId' type="text" placeholder="Post Title" onChange={(e) => this.savedPost.title = e.target.value} />
                <textarea id='textAreaId' cols="30" rows="6" placeholder="Post Content" onChange={(e) => this.savedPost.content = e.target.value} />
                <Button clicked={this.savePostHandler} btnType='SavePost'>Save Post</Button>
            </div>
        )
    }
}
export default PostCreate