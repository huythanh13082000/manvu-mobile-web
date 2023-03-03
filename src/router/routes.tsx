import CampaignDetail from '../pages/campaign_detail'
import Home from '../pages/home'
import Login from '../pages/Login'
import Register from '../pages/register'
import RegisterAdvertiser from '../pages/register_advertiser'
import RegisterMember from '../pages/register_member'
import TermOfUse from '../pages/teams_of_use'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  CAMPAIGN_DETAIL: '/campaign_detail',
  TERMS_OF_USE: '/terms_of_use',
  REGISTER: '/register',
  RESISTER_MEMBER: '/register_member',
  RESISTER_ADVERTISER: '/register_advertiser',
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
  {path: ROUTE.REGISTER, element: <Register />},
  {path: ROUTE.RESISTER_MEMBER, element: <RegisterMember />},
  {path: ROUTE.RESISTER_ADVERTISER, element: <RegisterAdvertiser />},
]
export default routes
