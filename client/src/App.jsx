import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Homepage from './Pages/Homepage'
import WelcomeComponent from './Pages/Welcome'

const routes=createBrowserRouter([{
  path:'/home',
  element:<Homepage/>
},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/',
  element:<WelcomeComponent/>
},
{
  path:'/signup',
  element:<Signup/>
}
])
const App = () => {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
