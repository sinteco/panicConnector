import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Regsiter from './components/auth/Regsiter';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import  store from './store';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar/>
          <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Regsiter} />
              <Route exact path="/login" component={Login} />
            </div>
        <Footer/>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
