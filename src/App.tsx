import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { PostPage } from './pages/PostPage'
import { PostDetailPage } from './pages/PostDetailPage'
import { CreatePostPage } from './pages/CreatePostPage'
import { UpdatePostPage } from './pages/UpdatePostPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signUp' element={<SignUpPage />}></Route>
        <Route path='/posts' element={<PostPage />}></Route>
        <Route path='/posts/:postId' element={<PostDetailPage />}></Route>
        <Route path='/posts/create' element={<CreatePostPage />}></Route>
        <Route path='/posts/:postId/comments' element={<PostDetailPage />}></Route>
        <Route path='/posts/:postId/update' element={<UpdatePostPage />}> </Route>


        <Route path='*' element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
