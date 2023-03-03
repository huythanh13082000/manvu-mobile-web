import CampaignDetail from '../pages/campaign_detail'
import Home from '../pages/home'
import Login from '../pages/Login'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  CAMPAIGN_DETAIL: '/campaign_detail',
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
  {path: ROUTE.CAMPAIGN_DETAIL, element: <CampaignDetail />},
]
export default routes
