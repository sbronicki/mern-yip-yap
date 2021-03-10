import Layout from './Containers/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'

//NEED TO: 
// add skeleton loader
// hide sidedrawer when navitem selected
// load more posts upon request
// add images to posts 
// add user auth 
// redux
  

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
