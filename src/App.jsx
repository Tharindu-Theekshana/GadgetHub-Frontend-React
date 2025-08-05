import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './components/Products'
import Login from './components/Login'
import CustomerDashboard from './components/CustomerDashboard'
import DistributorDashboard from './components/DistributorDashboard'
import MyOrders from './components/myOrders'
import MyCart from './components/MyCart'
import Settings from './components/Settings'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/customerDashboard' element={<CustomerDashboard/>}/>
          <Route path='/distributorDashboard' element={<DistributorDashboard/>}/>
          <Route path='/myOrders' element={<MyOrders/>}/>
          <Route path='/myCart' element={<MyCart/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
