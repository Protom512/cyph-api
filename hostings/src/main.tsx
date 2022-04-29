import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Whoami from './pages/Whoami';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/whoami',
    element: <Whoami />,
  },
  {
    path: '*',
    element: (
      <main style={{ padding: '1rem' }}>
        <p>There&lspos nothing here!</p>
      </main>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
