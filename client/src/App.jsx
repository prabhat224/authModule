import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Homepage from './Pages/Homepage'

const routes=createBrowserRouter([{
  path:'/',
  element:<Homepage/>
},
{
  path:'/login',
  element:<Login/>
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
