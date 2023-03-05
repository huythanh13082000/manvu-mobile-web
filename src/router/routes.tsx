import CampaignDetail from '../pages/campaign_detail'
import Home from '../pages/home'
import Login from '../pages/Login'
import ProductPage from '../pages/product'
import Register from '../pages/register'
import RegisterAdvertiser from '../pages/register_advertiser'
import RegisterMember from '../pages/register_member'
import ReportersPage from '../pages/reporters'
import ServicePage from '../pages/service'
import ServicesPage from '../pages/services'
import TermOfUse from '../pages/teams_of_use'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  PRODUCT: '/product',
  SERVICE: '/service',
  SERVICES: '/services',
  REPORTERS: '/reporters',
  LOGIN: '/login',
  CAMPAIGN_DETAIL: '/campaign_detail/:id',
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
  {path: ROUTE.PRODUCT, element: <ProductPage />},
  {path: ROUTE.SERVICES, element: <ServicesPage />},
  {path: ROUTE.SERVICE, element: <ServicePage />},
  {path: ROUTE.REPORTERS, element: <ReportersPage />},
]
export default routes
