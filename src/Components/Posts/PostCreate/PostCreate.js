import { Component } from 'react'
import axios from 'axios'

import classes from './PostCreate.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import PostSavedMessage from './PostSavedMessage/PostSavedMessage'


class PostCreate extends Component {
    imagePreview = ''
    state = { 
        title: '',
        content: '',
        image: null,
        imagePreview: null,
        disabled: true,
        displaySavedPostMessage: false
     }
    fileSelectClick = () => {
        const fileSelect = document.getElementById('fileSelect')
        fileSelect.click()
    }
    onImageSelectedHandler = (e) => {
        if(e.target.files.length === 1){
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = () => {
                this.imagePreview = reader.result
                this.setState({image: file, imagePreview: this.imagePreview})
            }
            reader.readAsDataURL(file)
        } else return
    }
    onInputChangeHandler = (e) => {
        if(e.target.id === 'inputElement') {
            this.setState({title: e.target.value})
        }
        else if(e.target.id === 'textAreaElement'){ 
            this.setState({content: e.target.value})
        }
        if(this.state.disabled){
            if(this.state.title.length >= 1 && this.state.content.length >= 1 ) {
                this.setState({disabled: false})
            }
        }
    }
    savePostHandler = () => {
        const post = {
            title: this.state.title,
            content: this.state.content
        }
        axios
        .post('/posts', post)
        .then(response => {
            const inputElement = document.getElementById('inputElement')
            const textAreaElement = document.getElementById('textAreaElement')
            inputElement.value = ''
            textAreaElement.value = ''
            this.setState({title: '', content: '', disabled: true, displaySavedPostMessage: true})
            });
            setTimeout(() => {
                this.setState({displaySavedPostMessage: false})
            }, 2000)
    } 
    render() {
        return(
            <div className={classes.PostCreateContainer}>
            <div className={classes.PostCreate}>
                <Input 
                    id='inputElement'
                    type="text" 
                    placeholder="Post Title"
                    onChange={this.onInputChangeHandler} />
                <Input
                    id='textAreaElement'
                    inputtype='textarea'
                    cols="30" 
                    rows="6" 
                    placeholder="Post Content" 
                    onChange={this.onInputChangeHandler} />
                    <PostSavedMessage displaySavedPostMessage={this.state.displaySavedPostMessage} />
                <div className={classes.ButtonContainer}>
                    <Button disabled={this.state.disabled} clicked={this.savePostHandler} btnType='SavePost'>Save Post</Button>
                    <Input onChange={this.onImageSelectedHandler} type="file" id='fileSelect'/>
                    <Button clicked={this.fileSelectClick} btnType='ImageUpload'>Upload Image</Button>
                </div>
            </div>
            {this.state.image ? 
                <div>
                    <p>Preview: {this.state.image.name}</p>
                    <img src={this.state.imagePreview} alt={this.state.image.name}/>
                </div> : null}
            </div>
        )
    }
}
export default PostCreate