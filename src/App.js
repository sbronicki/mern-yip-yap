import Layout from './Containers/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'

//NEED TO: 
// add skeleton loader
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
