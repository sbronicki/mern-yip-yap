import Layout from './Containers/Layout/Layout'

//NEED TO: 

// add user names
// navigate to feed after updating a post
// add skeleton loader
// hide sidedrawer when navitem selected
// paginator /  load more posts upon request
// better routing
// add user auth 
// more robust way of disabling save post button =>
// => typing then deleting and submittting blank forms still possible & crashes server lol
// => also should be able to save after changing only the image
// memory leak after changing image in edit post if switch to feed before settimeout finishes
// because state is set when time out is finished
// add delete image option in post create / edit preview
// character limits for title and content
// select a single post 
// if not logged /profile shows brand profile => 
// => edit / follow button displays follow and if clicked links to signup/in 
// => if logged in and is your profile button displays edut profile
// => logged in and not your profile button displays follow / unfollow

function App() {
  return (
      <div className="App">
        <Layout />
      </div>
  );
}

export default App;
