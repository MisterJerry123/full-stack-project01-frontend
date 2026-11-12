import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './presentation/pages/LoginPage'
import { SignUpPage } from './presentation/pages/SignUpPage'
import { PostPage } from './presentation/pages/PostPage'
import { PostDetailPage } from './presentation/pages/PostDetailPage'
import { CreatePostPage } from './presentation/pages/CreatePostPage'
import { UpdatePostPage } from './presentation/pages/UpdatePostPage'
import { MyInfoPage } from './presentation/pages/MyInfoPage'
import { UpdateInfoPage } from './presentation/pages/UpdateInfoPage'
import { MainLayout } from './presentation/layouts/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signUp' element={<SignUpPage />}></Route>

        <Route element={<MainLayout />}>
          <Route path='/posts' element={<PostPage />}></Route>
          <Route path='/posts/:postId' element={<PostDetailPage />}></Route>
          <Route path='/posts/create' element={<CreatePostPage />}></Route>
          <Route path='/posts/:postId/comments' element={<PostDetailPage />}></Route>
          <Route path='/posts/:postId/update' element={<UpdatePostPage />}> </Route>
          <Route path='/mypage' element={<MyInfoPage />}></Route>
          <Route path='/mypage/edit' element={<UpdateInfoPage />}></Route>
        </Route>

        <Route path='*' element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
