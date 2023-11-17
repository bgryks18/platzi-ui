import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MenubarComponent from './components/Header/Header'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Users from './pages/Users'
import Toast from './components/Toast/Toast'

function App() {
  return (
    <>
      <MenubarComponent />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/users" element={<Users />}></Route>
      </Routes>
      <Toast />
    </>
  )
}

export default App
