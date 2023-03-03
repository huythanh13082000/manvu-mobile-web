import {all} from 'redux-saga/effects'
import campaignSaga from '../feature/campaign/campaign.saga'
import campaignDetailSaga from '../feature/campaign_detail/campaignDetail.saga'
import cardSaga from '../feature/card/card.saga'
import createCampaignSaga from '../feature/create_campaign/createCampaign.Saga'
import myCampaignSaga from '../feature/my_campaign/myCampaign.saga'
import myCampaignAdvertiserSaga from '../feature/my_campaign_advertiser/myCampaignAdvertiser.saga'
export default function* rootSaga() {
  yield all([
    campaignSaga(),
    myCampaignSaga(),
    myCampaignAdvertiserSaga(),
    createCampaignSaga(),
    campaignDetailSaga(),
    cardSaga()
  ])
}
