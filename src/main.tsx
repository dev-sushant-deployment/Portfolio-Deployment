import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import { Home } from './Components/pages/Home.tsx'
import { Projects } from './Components/pages/Projects.tsx'
import { Project } from './Components/pages/Project.tsx'
import { Contact } from './Components/pages/Contact.tsx'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />}/>
      <Route path="projects" element={<Projects/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="project/:name" element={<Project/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
