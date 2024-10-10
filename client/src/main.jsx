import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import { RouterProvider } from 'react-router-dom'
import Tweets from './components/Tweets.jsx'
import RegisterPage from './components/ResgisterPage.jsx'
import LoginPage from './components/LoginPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="" element={<Home />} />
    <Route path="/tweets" element={<Tweets />} />
    <Route path="/api/auth/register" element={<RegisterPage />} />
    <Route path="/api/auth/login" element={<LoginPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
