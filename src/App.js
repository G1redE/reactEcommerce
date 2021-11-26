import LoginPage from './routes/LoginPage';
import SignUpPage from './routes/SignUpPage';
import MainPage from './routes/MainPage';
import  PhoneLogin from './routes/PhoneLoginPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
function App() {
  return <Router>
    <Switch>
      <Route exact path="/" component={() => <MainPage/>}/>
      <Route exact path="/login" component={()=> <LoginPage />}/>
      <Route exact path="/signup" component={() => <SignUpPage />}/>
      <Route exact path="/login/phone" component={() => <PhoneLogin/>}/>
    </Switch>

  </Router>;
   
}

export default App;
