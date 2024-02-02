import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './routes/Landing';
import ErrorPage from './routes/ErrorPage';
import Fallback from './components/Fallback';

import './index.css';
import { AuthProvider } from './context/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import Lyt_Home from './layouts/Lyt_Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    lazy: () => import("./routes/Login"),
  },
  // ProtectedRoutes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Lyt_Home />,
        children: [
          {
            path: "/home",
            async loader() {
              const { loader }= await import("./connections/home.loader");
              return loader();
            },
            lazy: () => import("./routes/Home")
          },
          {
            path: "/user/:id?",
            async loader(props) {
              const { loader } = await import("./connections/userInfo.loader");
              return loader(props);
            },
            lazy: () => import("./routes/UserInfo")
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider 
        router={router}
        fallbackElement={<Fallback />}
      />
    </AuthProvider>
  </React.StrictMode>,
)
