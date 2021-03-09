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
        axios
        .post('http://localhost:4200/posts', this.savedPost)
        .then(response => {
            this.inputElement.value = ''
            this.textAreaElement.value = ''
            });
    } 
    componentDidMount(){
        console.log(this.fileSelect)
    }
    render() {
        return(
            <div className={classes.PostCreate}>
                <input 
                    ref={(inputElement) => {this.inputElement = inputElement}} 
                    type="text" 
                    placeholder="Post Title"
                    onChange={(e) => this.savedPost.title = e.target.value} />
                <textarea 
                    ref={(textAreaElement) => {this.textAreaElement = textAreaElement}} 
                    cols="30" 
                    rows="6" 
                    placeholder="Post Content" 
                    onChange={(e) => this.savedPost.content = e.target.value} />
                <div className={classes.ButtonContainer}>
                    <Button clicked={this.savePostHandler} btnType='SavePost'>Save Post</Button>
                    <input type="file" ref={(fileSelect) => {this.fileSelect = fileSelect}} />
                    <Button btnType='ImageUpload'>Upload Image</Button>
                </div>
            </div>
        )
    }
}
export default PostCreate