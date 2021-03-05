import Layout from './Layout/Layout'
import Posts from './Components/Posts/Posts'

//NEED TO: 
// write code for componentDidMount and savePostHandler into one function to be used by both in Posts.js
// add edit and delete options to posts and wire up to server
// clear input fields after saving a new post
// not allow posts if missing title or content / disable button
// savedPosts loaded from db initiallly max of 10, more upon request
  

function App() {
  return (
    <div className="App">
      <Layout>
        <Posts />
      </Layout>
    </div>
  );
}

export default App;
