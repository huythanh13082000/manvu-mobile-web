import React, {useEffect, useState} from 'react'
import makeStyles from '@mui/styles/makeStyles'
import HeaderSearch from '../../components/header/headerSearch'
import Box from '@mui/material/Box/Box'
import Tabs from '@mui/material/Tabs/Tabs'
import Tab from '@mui/material/Tab/Tab'
import Filter from '../../components/filter'
import CardBase from '../../components/card_base'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  campaignActions,
  selectListCampaign,
  selectOffset,
} from '../../feature/campaign/campaign.slice'
import {Campaign} from '../../types/campaign.type'
import {Area} from '../../types/area.type'
import InfiniteScroll from 'react-infinite-scroll-component'

const useStyles = makeStyles({
  home_container: {
    '&>div:last-child': {
      '&>div': {
        padding: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
  },
})

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Home = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(0)
  const listCampaign: Array<Campaign> = useAppSelector(selectListCampaign)
  const offsetStore = useAppSelector(selectOffset)
  const [limit, setLimit] = useState(30)
  const [offset, setOffset] = useState<number>(offsetStore)
  const [medias, setMedias] = useState<string[]>([
    'facebook',
    'instagram',
    'youtube',
    'blog_naver',
    'twitter',
    'tiktok',
  ])
  const [columsfilter, setColumsfilter] = useState<string>('')
  const [tagIds, setTagIds] = useState<number[]>([])
  const [areaIds, setAreaIds] = useState<Area[]>([])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    const newAreaIds = areaIds.map((item) => {
      return item.id
    })
    dispatch(
      campaignActions.getListCampaignSort({
        limit: limit,
        offset: offset,
        medias: JSON.stringify(medias),
        tagIds: JSON.stringify(tagIds),
        sortBy: columsfilter,
        areaIds: JSON.stringify(newAreaIds),
      })
    )
  }, [dispatch, limit, offset, medias, tagIds, columsfilter, areaIds])
  return (
    <div className={classes.home_container}>
      <HeaderSearch />
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='scrollable'
        >
          <Tab label='전체' {...a11yProps(0)} />
          <Tab label='지역' {...a11yProps(1)} />
          <Tab label='제품' {...a11yProps(2)} />
          <Tab label='서비스' {...a11yProps(4)} />
          <Tab label='기자단' {...a11yProps(5)} />
        </Tabs>
      </Box>
      <Box bgcolor={'#F6F6F6'} padding='1rem'>
        <Filter />
      </Box>
      <InfiniteScroll
        dataLength={listCampaign.length}
        next={() => setOffset(offset + 5)}
        hasMore={true}
        loader={<></>}
      >
        {listCampaign.map((item) => (
          <CardBase key={item.id} data={item}/>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default Home
