import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PostPage from './pages/PostPage'
import MainLayout from './layouts/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  )
}

export default App
