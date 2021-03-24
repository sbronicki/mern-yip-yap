import { Component } from 'react';
import { connect } from 'react-redux';

import classes from './PostCreate.module.css';
import Button from '../../../Components/UI/Button/Button';
import Input from '../../../Components/UI/Input/Input';
import PostSavedMessage from '../../../Components/PostSavedMessage/PostSavedMessage';
import ImageTooBigMessage from '../../../Components/ImageTooBigMessage/ImageTooBigMessage';
import Error from '../../../Components/UI/Error/Error'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import AuxWrapper from '../../../HOC/AuxWrapper'
import * as postCreateActions from '../../../store/actions/postCreateActions'


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
	};

	fileSelectClick = () => {
		const fileSelect = document.getElementById('fileSelect');
		fileSelect.click();
	};
	onImageSelectedHandler = (e) => {
		if (e.target.files.length === 1 && e.target.files[0].size < 70000) {
			if (e.target.files[0].type.substr(0, 5) === 'image') {
				const file = e.target.files[0];
				const reader = new FileReader();
				reader.onload = () => {
					const imagePreview = reader.result;
					this.setState({ image: file, imagePreview: imagePreview });
				};
				reader.readAsDataURL(file);
			}
		} else if (e.target.files[0].size > 70000) {
			this.setState({ displayImageTooBigMessage: true });
			setTimeout(() => {
				this.setState({ displayImageTooBigMessage: false });
			}, 3000);
		}
	};
	onInputChangeHandler = (e) => {
		if (e.target.id === 'inputElement') {
			this.setState({ title: e.target.value });
		} else if (e.target.id === 'textAreaElement') {
			this.setState({ content: e.target.value });
		}
		if (this.state.disabled) {
			if (this.state.title.length >= 1 && this.state.content.length >= 1) {
				this.setState({ disabled: false });
			}
		}
	};
	savePostHandler = () => {
		const postData = {
			title: this.state.title,
			content: this.state.content,
			image: this.state.imagePreview
		};

		this.props.onSavePost(postData)

		// need to await response or else this runs even with an error
		if(!this.props.error){
			const inputElement = document.getElementById('inputElement');
			const textAreaElement = document.getElementById('textAreaElement');

			inputElement.value = '';
			textAreaElement.value = '';

			this.setState({
				title: '',
				content: '',
				id: '',
				image: null,
				imagePreview: null,
				disabled: true,
				displaySavedPostMessage: true
			});
			setTimeout(() => {
				this.setState({ displaySavedPostMessage: false });
			}, 2000);
		}
	};
	updatePostHandler = () => {
		const post = {
			id: this.state.id,
			title: this.state.title,
			content: this.state.content,
			image: this.state.imagePreview
		};
		this.props.onUpdatePost(post)
		const textAreaElement = document.getElementById('textAreaElement');
		const inputElement = document.getElementById('inputElement');

		textAreaElement.value = '';
		inputElement.value = '';

		this.setState({
			title: '',
			id: '',
			image: null,
			content: '',
			disabled: true,
			imagePreview: null,
			displaySavedPostMessage: true
		});
		
		setTimeout(() => {
			this.setState({ displaySavedPostMessage: false });
		}, 2000);
	};
	updateAfterMount = () => {
		// this is not the correct way to accomplish this lol
		setTimeout(() => {
			if(this.props.id){
				const inputElement = document.getElementById('inputElement');
				const textAreaElement = document.getElementById('textAreaElement');

				textAreaElement.value = this.props.content;
				inputElement.value = this.props.title;
				if (this.props.image) {
							this.setState({
								editMode: true,
								title: this.props.title,
								content: this.props.content,
								id: this.props.id,
								image: true,
								imagePreview: this.props.image
							});
						} else {
							this.setState({
								editMode: true,
								title: this.props.title,
								content: this.props.content,
								id: this.props.id
							});
						}
			}
		}, 300);
	}
	componentDidMount() {
		if (this.props.match.params.id) {
			const postId = this.props.match.params.id
			this.props.onGetPostToUpdate(postId)
			
			this.updateAfterMount()
		}
	}
	render() {
		return (
			<div className={classes.PostCreateContainer}>
				<div className={classes.PostCreate}>
					<Input
						id="inputElement"
						type="text"
						placeholder="Post Title"
						onChange={this.onInputChangeHandler}
					/>
					<Input
						id="textAreaElement"
						inputtype="textarea"
						cols="30"
						rows="6"
						placeholder="Post Content"
						onChange={this.onInputChangeHandler}
					/>
					<ImageTooBigMessage displayimageTooBigMessage={this.state.displayImageTooBigMessage} />
					<PostSavedMessage saveType={this.props.postSaved ? 'saved' : 'updated'} displaySavedPostMessage={this.state.displaySavedPostMessage} />
					<Spinner showSpinner={this.props.loading} />
					<div className={classes.ButtonContainer}>
						<Button
							disabled={this.state.disabled}
							clicked={this.state.editMode ? this.updatePostHandler : this.savePostHandler}
							btnType="SavePost">Save Post</Button>
						<Input accept="image/*" onChange={this.onImageSelectedHandler} type="file" id="fileSelect" />
						<Button clicked={this.fileSelectClick} btnType="ImageUpload">Upload Image</Button>
					</div>
				</div>
				{this.state.image ? (
					<div className={classes.ImagePreviewContainer}>
						<p>Preview: {this.state.image.name}</p>
						<img src={this.state.imagePreview} alt={this.state.image.name} />
					</div>
				) : null}
			</div>
		);
	}
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
		userId: state.auth.userId,
		title: state.postCreate.title,
		content: state.postCreate.content,
		image: state.postCreate.image,
		id: state.postCreate.id,
		editMode: state.postCreate.editMode,
		postSaved: state.postCreate.postSaved,
		postUpdated: state.postCreate.postUpdated,
		error: state.postCreate.error,
		loading: state.postCreate.loading
    }
}
const mapDispatchToProps = dispatch => {
	return {
		onSavePost: (postData) => dispatch(postCreateActions.savePost(postData)),
		onGetPostToUpdate: (postId) => dispatch(postCreateActions.getPostToUpdate(postId)),
		onUpdatePost: (post) => dispatch(postCreateActions.updatePost(post))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);