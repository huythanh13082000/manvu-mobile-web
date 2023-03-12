import {Tab, Tabs, Grid} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import CardBase from '../../components/card_base'
import Filter from '../../components/filter'
import HeaderSearch from '../../components/header/headerSearch'
import Box from '@mui/material/Box/Box'
import {
  selectCategories,
  selectListCampaignServices,
  selectOffsetServices,
  servicesActions,
} from '../../feature/services/services.slice'
import {Area} from '../../types/area.type'
import {Campaign} from '../../types/campaign.type'
import {Categories} from '../../types/categories.type'

const useStyles = makeStyles({
  services_container: {
    '&>div:last-child': {
      '&>div': {
        padding: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
  },
})

const ServicesPage = () => {
  const classes = useStyles()

  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const offsetServices = useAppSelector(selectOffsetServices)
  const [limit, setLimit] = useState(30)
  const [title, setTitle] = useState('전체')
  const dispatch = useAppDispatch()
  const listCampaignServices: Campaign[] = useAppSelector(
    selectListCampaignServices
  )
  const [offset, setOffset] = useState<number>(offsetServices)
  const [areaIds, setAreaIds] = useState<Area[]>([])
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
  const listTab: Categories[] = useAppSelector(selectCategories)
  useEffect(() => {
    dispatch(
      servicesActions.getCategories({tabId: 3, categoryId: 0, limit: 20})
    )
  }, [dispatch])
  useEffect(() => {
    const newAreaIds = areaIds.map((item) => {
      return item.id
    })
    dispatch(
      servicesActions.getListCampaignServices({
        tabId: 3,
        categoryId: value !== 0 ? value + 15 : value,
        limit: limit,
        offset: offset,
        medias: JSON.stringify(medias),
        tagIds: JSON.stringify(tagIds),
        sortBy: columsfilter,
        areaIds: JSON.stringify(newAreaIds),
      })
    )
  }, [value, dispatch, limit, offset, medias, tagIds, columsfilter, areaIds])
  return (
    <div className={classes.services_container}>
      {/* <HeaderSearch /> */}

      <Box bgcolor={'#F6F6F6'}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div>
            <Filter
              medias={medias}
              tagIds={tagIds}
              setMedias={(params) => setMedias(params)}
              setTagIds={(params) => setTagIds(params)}
              areaIds={areaIds}
              setAreaIds={(params) => setAreaIds(params)}
              setOffset={(params) => {
                setOffset(params)
              }}
              columsfilter={columsfilter}
              setColumsfilter={(params) => setColumsfilter(params)}
            />
          </div>
          <Tabs onChange={handleChange} value={value} variant='scrollable'>
            <Tab
              className='buttomCustom'
              label={'전체'}
              onClick={() => {
                setTitle('전체')
                setOffset(0)
              }}
            />
            {listTab.map((item, index) => {
              return (
                <Tab
                  key={item.text}
                  label={item.text}
                  onClick={() => {
                    setTitle(item.text)
                    setOffset(0)
                  }}
                />
              )
            })}
          </Tabs>
        </div>
      </Box>
      <InfiniteScroll
        dataLength={listCampaignServices.length}
        next={() => setOffset(offset + 10)}
        hasMore={true}
        loader={<></>}
      >
        {listCampaignServices
          .filter((item) => item.status === 1)
          .map((item) => {
            return <CardBase key={item.id} data={item} />
          })}
      </InfiniteScroll>
    </div>
  )
}

export default ServicesPage
