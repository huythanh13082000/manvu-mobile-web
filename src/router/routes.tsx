import CampaignDetail from '../pages/campaign_detail'
import Home from '../pages/home'
import Login from '../pages/Login'
import TermOfUse from '../pages/teams_of_use'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  CAMPAIGN_DETAIL: '/campaign_detail',
  TERMS_OF_USE: '/terms_of_use',
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
  {path: ROUTE.TERMS_OF_USE, element: <TermOfUse />},
]
export default routes
