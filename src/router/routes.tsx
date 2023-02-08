import DevelopmentInquiry from '../pages/development_inquiry'
import EstimateCalculation from '../pages/estimate_calculation'
import Home from '../pages/home'
import Portfolio from '../pages/portfolio'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  PORTFOLIO: '/portfolio',
  ESTIMATE_CALCULATION: '/estimate_calculation',
  DEVELOPMENT_INQUIRY: '/development_inquiry',
}

const routes: Array<MyRouteProp> = [
  {
    path: ROUTE.HOME,
    element: <Home />,
  },
  {
    path: ROUTE.PORTFOLIO,
    element: <Portfolio />,
  },
  {
    path: ROUTE.DEVELOPMENT_INQUIRY,
    element: <DevelopmentInquiry />,
  },
  {
    path: ROUTE.ESTIMATE_CALCULATION,
    element: <DevelopmentInquiry />,
  },
]
export default routes
