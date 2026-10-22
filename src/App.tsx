import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { HomePage } from './pages/Home'

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/signUp' element={<SignUpPage />}></Route>
    <Route path='/health' element={<HomePage/>}></Route>
    <Route path='*' element={<LoginPage />}></Route>
  </Routes>
  </BrowserRouter>
  )
  
}


export default App
