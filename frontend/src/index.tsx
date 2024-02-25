import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Projects from './Pages/Projects';
import Profile from './Pages/Profile';
import axios from 'axios';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    { 
      path: "/sign-up",
      element: <SignUp />
    },
    {
      path: "/log-in",
      element: <LogIn />,
    },{
      path: "/projects",
      element: <Projects />,
    },{
      path: "/profile",
      element: <Profile />,
      loader: async () => {
        // get a token from local storage
        const token = localStorage.getItem('token');

        // if we have a token, we'll use it as a bearer token on our request for user data
        if (token) {
          try {
            const response = await axios.get('http://localhost:3025/auth/profile', {
              headers: { Authorization: `Bearer ${token}`}
            })
            return response.data;
          } catch (error) {
            console.log(error);
            return redirect("/log-in")
          }
        } else {
          console.log('NO TOKEN');
          return redirect('/sign-up')
        }

        // if we do not have a token, we will show an error toast and redirect the user to the sign-up page

      },
    },
    ],
  },
]);
console.log("router", router);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( <RouterProvider router={ router }/> );
