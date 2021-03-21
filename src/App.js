import Layout from './Containers/Layout/Layout'

//NEED TO: 
// navigate to feed after updating a post
// add skeleton loader
// hide sidedrawer when navitem selected
// paginator /  load more posts upon request
// better routing
// add user auth 
// more robust way of disabling save post button
// => typing then deleting and submittting blank forms still possible & crashes server lol
// memory leak after changing image in edit post if switch to feed before settimeout finishes
// because state is set when time out is finished
// add delete image option in post create / edit preview
// add title and favicon 
  

function App() {
  return (
      <div className="App">
        <Layout />
      </div>
  );
}

export default App;
