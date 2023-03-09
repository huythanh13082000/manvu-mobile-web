import {Grid, Tab, Tabs} from '@mui/material'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import CardChannel from '../../components/CardChannel'
import {
  campaignDetailAction,
  selectcampaignDetail,
} from '../../feature/campaign_detail/campaignDetail.slice'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'
import {selectTabCampaignDetail} from '../../feature/tab/tab.slice'
import {selectUser} from '../../feature/user/user.slice'
import searchIcon from '../../asset/icons/search.png'
import './CampaignDetail.css'

const CampaignAdvertiserManager = () => {
  const [value, setValue] = React.useState<number>(0)
  const [valueTabApp, setValueTabApp] = useState(0)
  const [titleTabApp, setTitleTabApp] = useState('신청 리뷰어')
  const campaignDetail = useAppSelector(selectcampaignDetail)
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const handleChangeTabApp = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueTabApp(newValue)
  }
  const joinRequest = (id: number) => {
    if (campaignDetail?.joinRequest) {
      dispatch(campaignDetailAction.deleteRequest(id))
    } else {
      dispatch(campaignDetailAction.createRequest(id))
    }
  }
  const user = useAppSelector(selectUser)
  const activeTabCampaignDetail = useAppSelector(selectTabCampaignDetail)
  const listHashTag = useAppSelector(selectListHashTag)

  const styleTab = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '22px',
    color: '#4D4D4D',
  }
  React.useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(campaignDetailAction.getCampaignDetail(Number(id)))
  }, [dispatch, id])
  useEffect(() => {
    setValue(activeTabCampaignDetail)
  }, [activeTabCampaignDetail, dispatch])

  const getDate = (params: string): string => {
    return `${moment(params).format('MM')}월${moment(params).format('DD')}일`
  }
  console.log(1221, campaignDetail)
  return (
    <Grid container justifyContent='center'>
      <AppBarCustom
        title='강남역 목삼겹살 모집합니다...'
        iconRightUrl={searchIcon}
      />
      {campaignDetail && (
        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} marginTop='1rem'>
              {value === 0 ? (
                <>
                  {user.profile &&
                  user.profile?.roles &&
                  user.profile?.roles[0] &&
                  user.profile?.roles[0].name === 'advertiser' ? (
                    <>
                      <Tabs
                        onChange={handleChangeTabApp}
                        value={valueTabApp}
                        aria-label='Tabs where each tab needs to be selected manually'
                        centered
                      >
                        <Tab
                          label={`신청 리뷰어 (${campaignDetail?.members?.length})`}
                          onClick={() => {
                            setTitleTabApp('신청 리뷰어')
                          }}
                        />
                        <Tab
                          label={`선정된 리뷰어 (${
                            campaignDetail?.members?.filter(
                              (item) => item.status === 1
                            ).length
                          })`}
                          onClick={() => {
                            setTitleTabApp('선정된 리뷰어')
                          }}
                        />
                      </Tabs>
                      {valueTabApp === 0 ? (
                        <>
                          <Grid item xs={12} container>
                            {user &&
                            user.profile &&
                            user.profile?.roles &&
                            user.profile?.roles[0].name === 'advertiser'
                              ? campaignDetail?.members &&
                                campaignDetail?.members?.map((item) => {
                                  return (
                                    <Grid item xs={12}>
                                      <CardChannel
                                        status='0'
                                        data={item}
                                        key={item.id}
                                      />
                                    </Grid>
                                  )
                                })
                              : null}
                          </Grid>
                        </>
                      ) : null}

                      {valueTabApp === 1 ? (
                        <>
                          <Grid>
                            <Grid item xs={12} container>
                              {user &&
                              user.profile &&
                              user.profile?.roles &&
                              user.profile?.roles[0].name === 'advertiser'
                                ? campaignDetail?.members &&
                                  campaignDetail?.members
                                    ?.filter((item) => item.status === 1)
                                    .map((item) => {
                                      return (
                                        <Grid item xs={12}>
                                          <CardChannel
                                            data={item}
                                            key={item.id}
                                          />
                                        </Grid>
                                      )
                                    })
                                : null}
                            </Grid>
                          </Grid>
                        </>
                      ) : null}
                    </>
                  ) : (
                    campaignDetail?.members &&
                    campaignDetail?.members
                      ?.filter((item) => item.post?.status === 1)
                      .map((item) => {
                        return (
                          <Grid item xs={12}>
                            <CardChannel data={item} key={item.id} />
                          </Grid>
                        )
                      })
                  )}
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default CampaignAdvertiserManager
