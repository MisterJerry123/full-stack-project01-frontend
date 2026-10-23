import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { PostPage } from './pages/PostPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signUp' element={<SignUpPage />}></Route>
        <Route path='/posts' element={<PostPage />}></Route>
        <Route path='*' element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
