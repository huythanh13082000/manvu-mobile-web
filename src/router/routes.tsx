import Home from '../pages/home'
import Login from '../pages/Login'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
}

const routes: Array<MyRouteProp> = [
  {
    path: ROUTE.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE.HOME,
    element: <Home />,
  },
]
export default routes
