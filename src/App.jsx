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
import PlaceOrder from './components/PlaceOrder'
import Quotations from './components/Quotations'
import RequestedOrders from './components/RequestedOrders'
import NewOrders from './components/NewOrders'
import SendQuotation from './components/SendQuotation'

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
          <Route path='/placeOrder' element={<PlaceOrder/>}/>
          <Route path='/quotations' element={<Quotations/>}/>
          <Route path='/requestedOrders' element={<RequestedOrders/>}/>
          <Route path='/newOrders' element={<NewOrders/>}/>
          <Route path='/sendQuotation' element={<SendQuotation/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
