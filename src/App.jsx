import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Category from './Pages/Category';
import About from './Pages/About';
import Header from './Pages/Header/Header';
import Services from './Pages/Services';
import ContactUs from './Pages/ContactUs';
import SignUp from './Auth/SignUp';
import LogIn from './Auth/LogIn';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Cart from './Pages/Cart/Cart';
import ProductDetails from './Pages/SingleProductDetail/ProductDetails';


function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/category' element={<Category />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/productdetails/:position' element={<ProductDetails/>} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/logIn' element={<LogIn />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App;











