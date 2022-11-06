import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Modal from "./components/Modal";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{
      path: "modal",
      element: <Modal />,
    }]
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
