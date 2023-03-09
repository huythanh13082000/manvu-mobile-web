import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles'
import AppBarCustom from '../../components/appbar'
import {Tab, Tabs} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  myCampaignAdvertiserActions,
  selectAdvertiserCampaignMine,
  selectAdvertiserCampaignMineCount,
  selectAdvertiserCampaignTotal,
} from '../../feature/my_campaign_advertiser/myCampaignAdvertiser.slice'
import {useNavigate} from 'react-router-dom'
import {selectListHashTag} from '../../feature/create_campaign/createCampaign.slice'
import moment from 'moment'
import {ROUTE} from '../../router/routes'

const useStyle = makeStyles({
  my_campaign_advertiser: {
    '&>div:nth-last-child(1)': {
      '&>div': {
        padding: '1rem',
        borderBottom: '1px solid #E1E1E1',
        '&>p:nth-child(1)': {
          fontWeight: 400,
          fontSize: '16px',
          margin: 0,
          marginBottom: '5px',
          '&>span': {
            color: 'red',
          },
        },
        '&>p:nth-child(2)': {
          fontWeight: 700,
          fontSize: '18px',
          margin: 0,
          marginBottom: '16px',
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
        },
        '&>div': {
          background: '#0078FF',
          borderRadius: '4px',
          width: '160px',
          margin: '0 auto',
          fontWeight: 500,
          fontSize: '12px',
          padding: '8px 0',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },
  },
})

const MyCampaignAdvertiser = () => {
  const classes = useStyle()
  const [value, setValue] = React.useState(0)
  const navigate = useNavigate()
  const [type, setType] = useState<string>('all')
  const dispatch = useAppDispatch()
  const advertiserCampaignMineCount: any = useAppSelector(
    selectAdvertiserCampaignMineCount
  )
  const [tabActive, setTabActive] = useState<number>(2)
  const listHashTag = useAppSelector(selectListHashTag)
  const [campaignId, setCampaignId] = useState<number>()
  const [tabValue, setTabValue] = useState<string>('전체 캠페인')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    switch (newValue) {
      case 0:
        setType('all')
        break
      case 1:
        setType('in_progress')
        break
      case 2:
        setType('requesting_update')
        break
      case 3:
        setType('complete')
        break
      default:
        break
    }
  }
  const listCampaignAdvertiser = useAppSelector(selectAdvertiserCampaignMine)
  const total = useAppSelector(selectAdvertiserCampaignTotal)
  useEffect(() => {
    dispatch(
      myCampaignAdvertiserActions.getAdvertiserCampaignMine({
        type: type,
      })
    )
  }, [dispatch, type])

  useEffect(() => {
    dispatch(myCampaignAdvertiserActions.getAdvertiserCampaignMineCount())
  }, [dispatch])
  return (
    <div className={classes.my_campaign_advertiser}>
      <AppBarCustom title='캠페인 현황' />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        variant='scrollable'
      >
        <Tab
          label={`전체(${advertiserCampaignMineCount['countTotal']})`}
          iconPosition='end'
          onClick={() => {
            setTabValue('전체 캠페인')
          }}
        />

        <Tab
          label={`진행중(${advertiserCampaignMineCount['countInProgress']})`}
          iconPosition='end'
          onClick={() => {
            setTabValue('진행중 캠페인')
          }}
        />
        <Tab
          label={`수정(${advertiserCampaignMineCount['countRequestUpdate']})`}
          iconPosition='end'
          onClick={() => {
            setTabValue('수정 캠페인')
          }}
        />
        <Tab
          label={`완료(${advertiserCampaignMineCount['countComplete']})`}
          iconPosition='end'
          onClick={() => {
            setTabValue('완료 캠페인')
          }}
        />
      </Tabs>
      <div>
        {listCampaignAdvertiser?.list?.map((item) => (
          <div>
            <p>
              신청날짜:
              {moment(item.campaignRegistrationDateFrom).format(
                'YYYY.MM.DD LT'
              )}{' '}
              <span>[진행중]</span>
            </p>
            <p>
              <span onClick={() => navigate(`/campaign_detail/${item.id}`)}>
                {item.name}
              </span>
              <span onClick={() => navigate(`/update_campaign/${item.id}`)}>
                <MoreVertIcon />
              </span>
            </p>
            <div
              onClick={() =>
                navigate(`/campaign_advertiser_manager/${item.id}`)
              }
            >
              <span>신청자 목록</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCampaignAdvertiser
