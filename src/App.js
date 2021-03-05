import Layout from './Containers/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'

//NEED TO: 
// add skeleton loader
// write code for componentDidMount and savePostHandler into one function to be used by both in Posts.js
// clear input fields after saving a new post
// not allow posts if missing title or content / disable button
// savedPosts loaded from db initiallly max of 10, more upon request
  

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
