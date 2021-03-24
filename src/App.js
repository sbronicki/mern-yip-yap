import {Component} from 'react'
import {connect} from 'react-redux'

import Layout from './Containers/Layout/Layout'
import * as actions from './store/actions/index'

//NEED TO: 

// ~~~!!!~~ASAP~~!!!~~~ =>
// ~~~!!!~~ASAP~~!!!~~~ =>
// ~~~!!!~~ASAP~~!!!~~~ =>
// add validation for inputs
// proper error handling 
// character limits for title and content
// add delete image option in post create / edit preview
// navigate to feed after updating a post
// hide sidedrawer when navitem selected
// style for all screen sizes
// redirect to login after successfully signing up
// clicking a post brings you to that users profile

// EVENTUALLY =>
// select a single post 
// add user PFPs
// add user header images
// handle get post to update auto fill better 
// lazy load posts
// paginator /  load more posts upon request
// memory leak after changing image in edit post if switch to feed before settimeout finishes
// => because state is set when time out is finished

// ONE DAY =>
// user forgot login handler
// verify emails
// add follower functionality
// likes & comments on posts

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoLogIn()
  }

  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogIn: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
