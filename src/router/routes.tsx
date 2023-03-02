import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
}

const routes: Array<MyRouteProp> = [
  {
    path: ROUTE.LOGIN,
    element: <>Login</>,
  },
]
export default routes
