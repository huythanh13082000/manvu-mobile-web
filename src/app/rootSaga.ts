import {all} from 'redux-saga/effects'
import campaignSaga from '../feature/campaign/campaign.saga'
import campaignDetailSaga from '../feature/campaign_detail/campaignDetail.saga'
import cardSaga from '../feature/card/card.saga'
import createCampaignSaga from '../feature/create_campaign/createCampaign.Saga'
import myCampaignSaga from '../feature/my_campaign/myCampaign.saga'
import myCampaignAdvertiserSaga from '../feature/my_campaign_advertiser/myCampaignAdvertiser.saga'
import productSaga from '../feature/product/product.saga'
import reportersSaga from '../feature/Reporters/reporters.saga'
import serviceSaga from '../feature/service/service.saga'
import servicesSaga from '../feature/services/services.saga'
import userSaga from '../feature/user/user.saga'
export default function* rootSaga() {
  yield all([
    campaignSaga(),
    myCampaignSaga(),
    myCampaignAdvertiserSaga(),
    createCampaignSaga(),
    campaignDetailSaga(),
    cardSaga(),
    productSaga(),
    servicesSaga(),
    reportersSaga(),
    serviceSaga(),
    userSaga()
  ])
}
