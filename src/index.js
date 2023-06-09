import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landmaaling from './components/Landmaaling';
import Aktivitet from './components/Aktivitet';
import Blog from "./components/Blog";
import Admin from "./components/Admin";
import { AuthContextProvider } from './util/AuthContext';
import ProtectedRoute from './util/ProtectedRoute';
import CreatePost from './components/CreatePost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/landmaaling",
    element: <Landmaaling />
  },
  {
    path: "/aktivitet",
    element: <Blog />
  },
  {
    path: "/og",
    element: <Aktivitet />
  },
  {
    path: "/admin",
    element:
      <AuthContextProvider>
        <Admin />
      </AuthContextProvider>
  },
  {
    path: "/createpost",
    element: 
      <AuthContextProvider>
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      </AuthContextProvider>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
