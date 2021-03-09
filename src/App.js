import Layout from './Containers/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'

//NEED TO: 
// add skeleton loader
// not allow posts if missing title or content / disable button
// load more posts upon request
  

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
