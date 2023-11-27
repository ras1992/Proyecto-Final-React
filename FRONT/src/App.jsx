import { Loading } from './Components/LoadingRam'
import NavBar from './Components/Navbar/NavBarPa';
import { Hero } from './Components/HeroRam'
import { Cupons } from './Components/CuponsRam'
import Submenu from './Components/SubmenuViv';
import { Contact } from './Components/ContactLau'
import { Checkout } from './Components/CheckoutRam';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from './Components/MenuViv';
import Footer from './Components/Footer';
import About from './Components/About/About';
import Login from './Components/Login';
import Register from './Components/Register';
import { NotFound } from './Components/NotFound';
import { Search } from './Components/Search';

/* //import { Checkout } from './Components/CheckoutRam'; */


function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div>

              <NavBar />
              <Hero />
              <Menu></Menu>

              <About />

              <Contact />

              <Footer />
            </div>
          } />
          <Route path='/login' element={
            <div>
              <NavBar />
              <Login />
              <Footer />
            </div>


          } />
          <Route path='/register' element={
            <div>
              <NavBar />
              <Register />
              <Footer />
            </div>


          } />
          <Route path='/cupons' element={
            <div>
              <NavBar />
              <Cupons />
              <Footer />
            </div>


          } />
          <Route path='/submenu' element={
            <div>
              <NavBar />
              <Submenu />
              <Footer />
            </div>

          } />
          <Route path='/checkout' element={
            <div>
              <NavBar />
              <Checkout />
              <Footer />
            </div>
          } />

          <Route path='/about' element={
            <div>
              <NavBar />
              <About />
              <Footer />
            </div>
          } />

          <Route path='/contact' element={
            <div>
              <NavBar />
              <Contact />
              <Footer />
            </div>
          } />

          <Route path='/search' element={
            <div>
              <NavBar />
              <Search/>
              <Footer />
            </div>
          } />

        <Route path='/404' element={
          <div>
            <NavBar />
            <NotFound />
            <Footer />
          </div>
        } />

      </Routes>
    </BrowserRouter>
      
    </div >


  );
}

export default App
