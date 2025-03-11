import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import {Switch , Route} from 'react-router-dom' 
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Vote from './components/voting/Vote'

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="https://votesphere-3.onrender.com/" component={Home} />
      <Route exact path="https://votesphere-3.onrender.com/signin" component={Login} />  
      <Route exact path="https://votesphere-3.onrender.com/signout"  />
      <Route exact path="https://votesphere-3.onrender.com/vote" component={Vote} />
      <Route exact path="https://votesphere-3.onrender.com/signup" component={Register} />
    </Switch>
    <Footer />
    </>
  );
}

export default App;
