import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loginform from './Components/Loginform';
import Protected from './Components/Protected';
import NavbarMain from './Components/NavbarMain';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     const token =localStorage.getItem('token');
//     if(token && token.length > 10) {
//     this.isAuthenticated = true
//   }
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100) // fake async
//   }
// }

// const PrivateRoute = ({ component: Component, ...rest}) => (
//   <Route {...rest} render={(props) => (
//       fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//     )}/>
//   )

const Root = () =>
<Router>
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/login" component={ Loginform } />
    <Route  path="/Protected" component= { NavbarMain } />
    <Route exact path="/Protected/Directory" component= { Protected } />
  </div>
</Router>

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
