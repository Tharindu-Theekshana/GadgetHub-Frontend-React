import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './components/Products'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/products' element={<Products/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
