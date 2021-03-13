import { Component } from 'react'
import axios from 'axios'

import classes from './PostCreate.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import PostSavedMessage from './PostSavedMessage/PostSavedMessage'
import ImageTooBigMessage from './ImageTooBigMessage/ImageTooBigMessage'

class PostCreate extends Component {
    state = { 
        title: '',
        content: '',
        id: '',
        image: null,
        imagePreview: null,
        disabled: true,
        displayImageTooBigMessage: false,
        displaySavedPostMessage: false,
        editMode: false
     }

    imagePreview = ''

    fileSelectClick = () => {
        const fileSelect = document.getElementById('fileSelect')
        fileSelect.click()
    }
    onImageSelectedHandler = (e) => {
        if(e.target.files.length === 1 && e.target.files[0].size < 70000){
            if(e.target.files[0].type.substr(0,5) === 'image'){
                const file = e.target.files[0]
                const reader = new FileReader()
                reader.onload = () => {
                    this.imagePreview = reader.result
                    this.setState({image: file, imagePreview: this.imagePreview})
                }
                reader.readAsDataURL(file)
            } 
        } else if(e.target.files[0].size > 70000) {
         this.setState({displayImageTooBigMessage: true})
         setTimeout(() => {
             this.setState({displayImageTooBigMessage: false})
         }, 3000)
     } 
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
            content: this.state.content,
            image: this.state.imagePreview
        }
        axios
        .post('/posts', post)
        .then(response => {
            const inputElement = document.getElementById('inputElement')
            const textAreaElement = document.getElementById('textAreaElement')
            inputElement.value = ''
            textAreaElement.value = ''
            this.setState({
                title: '', 
                content: '', 
                id: '', 
                image: null, 
                imagePreview: null, 
                disabled: true,
                displaySavedPostMessage: true})
            })
            .catch(error => console.log('file too big'))
            setTimeout(() => {
                this.setState({displaySavedPostMessage: false})
            }, 2000)
    } 
    updatePostHandler = () => {
        const post = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            image: this.state.imagePreview
        }
        axios
        .put('/posts/' + post.id, post)
        .then(response => {
            const inputElement = document.getElementById('inputElement')
            const textAreaElement = document.getElementById('textAreaElement')

            inputElement.value = ''
            textAreaElement.value = ''

            this.setState(
                {
                    id: '', 
                    title: '', 
                    content: '', 
                    image: null, 
                    imagePreview: null, 
                    disabled: true, 
                    displaySavedPostMessage: true
                })
            })
            .catch(error => console.log(error))
            setTimeout(() => {
                this.setState({displaySavedPostMessage: false})
            }, 2000)
    }
    componentDidMount() {
        if(this.props.match.params.id){
        axios.get('/posts/' + this.props.match.params.id)
        .then(response => {
            const inputElement = document.getElementById('inputElement')
            const textAreaElement = document.getElementById('textAreaElement')
            inputElement.value = response.data.posts.title
            textAreaElement.value = response.data.posts.content 
            if(response.data.posts.image){
                this.setState(
                    {
                        editMode: true, 
                        title: response.data.posts.title, 
                        content: response.data.posts.content,
                        id: response.data.posts._id,
                        image: true,
                        imagePreview: response.data.posts.image
                    }
                )
            } else {
                this.setState(
                    {
                        editMode: true, 
                        title: response.data.posts.title, 
                        content: response.data.posts.content,
                        id: response.data.posts._id
                    }
                )
            }
            })
        }
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
                <ImageTooBigMessage displayimageTooBigMessage={this.state.displayImageTooBigMessage} />
                <PostSavedMessage displaySavedPostMessage={this.state.displaySavedPostMessage} />
                <div className={classes.ButtonContainer}>
                    <Button 
                        disabled={this.state.disabled} 
                        clicked={this.state.editMode ? this.updatePostHandler : this.savePostHandler} 
                        btnType='SavePost'>Save Post</Button>
                    <Input 
                        accept='image/*'
                        onChange={this.onImageSelectedHandler} 
                        type="file" 
                        id='fileSelect'/>
                    <Button 
                    clicked={this.fileSelectClick} 
                    btnType='ImageUpload'>Upload Image</Button>
                </div>
            </div>
            {this.state.image ? 
                <div className={classes.ImagePreviewContainer}>
                    <p>Preview: {this.state.image.name}</p>
                    <img src={this.state.imagePreview} alt={this.state.image.name}/>
                </div> : null}
            </div>
        )
    }
}
export default PostCreate