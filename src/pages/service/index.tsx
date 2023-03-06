import {Tab, Tabs} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import CardService from '../../components/card_service'
import HeaderSearch from '../../components/header/headerSearch'
import {
  selectCategories,
  selectListCampaignService,
  selectOffsetService,
  selectTotalService,
  serviceActions,
} from '../../feature/service/service.slice'
import {Area} from '../../types/area.type'
import {Campaign} from '../../types/campaign.type'
import {Categories} from '../../types/categories.type'

const useStyles = makeStyles({
  service_container: {
    '&>div:last-child': {
      '&>div': {
        padding: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
  },
})

const ServicePage = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [position, setPosition] = useState<{lat: number; lng: number}>()
  const offsetService = useAppSelector(selectOffsetService)
  const [limit, setLimit] = useState(10)
  const [title, setTitle] = useState('전체')
  const [areaIds, setAreaIds] = useState<Area[]>([])
  const dispatch = useAppDispatch()
  const listCampaignService: Campaign[] = useAppSelector(
    selectListCampaignService
  )
  const [offset, setOffset] = useState<number>(offsetService)
  const total = useAppSelector(selectTotalService)

  const [medias, setMedias] = useState<string[]>([
    'facebook',
    'instagram',
    'youtube',
    'blog_naver',
    'twitter',
    'tiktok',
  ])

  const [columsfilter, setColumsfilter] = useState<string>('distance')
  const [tagIds, setTagIds] = useState<number[]>([])
  const listTab: Categories[] = useAppSelector(selectCategories)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position1) {
      if (!position)
        setPosition({
          lat: position1.coords.latitude,
          lng: position1.coords.longitude,
        })
    })
  }, [position])
  useEffect(() => {
    dispatch(serviceActions.getCategories({tabId: 1, categoryId: 0, limit: 20}))
  }, [dispatch])
  useEffect(() => {
    const newAreaIds = areaIds.map((item) => {
      return item.id
    })
    position &&
      dispatch(
        serviceActions.getListCampaignService({
          tabId: 1,
          categoryId: value,
          limit: limit,
          offset: offset,
          medias: JSON.stringify(medias),
          tagIds: JSON.stringify(tagIds),
          sortBy: columsfilter,
          areaIds: JSON.stringify(newAreaIds),
          lat: position?.lat,
          lng: position?.lng,
        })
      )
  }, [
    value,
    dispatch,
    limit,
    offset,
    medias,
    tagIds,
    columsfilter,
    areaIds,
    position,
  ])
  return (
    <div className={classes.service_container}>
      <HeaderSearch />
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

      {/* <Filter
              medias={medias}
              tagIds={tagIds}
              areaIds={areaIds}
              setAreaIds={(params) => setAreaIds(params)}
              setMedias={(params) => setMedias(params)}
              setTagIds={(params) => setTagIds(params)}
              setOffset={(params) => {
                setOffset(params)
              }}
              columsfilter={columsfilter}
              setColumsfilter={(params) => setColumsfilter(params)}
            /> */}
      <InfiniteScroll
        dataLength={listCampaignService.length}
        next={() => setOffset(offset + 10)}
        hasMore={true}
        loader={<></>}
      >
        {listCampaignService
          .filter((item) => item.status === 1)
          .map((item) => {
            return <CardService key={item.id} data={item} />
          })}
      </InfiniteScroll>
    </div>
  )
}

export default ServicePage
