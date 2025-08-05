import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './components/Products'
import Login from './components/Login'
import CustomerDashboard from './components/CustomerDashboard'
import DistributorDashboard from './components/DistributorDashboard'

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
        </Routes>
      </Router>
    </>
  )
}

export default App
