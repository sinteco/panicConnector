import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path='/register' element={<Regsiter/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
