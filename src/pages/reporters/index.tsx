import {Tab, Tabs} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import CardBase from '../../components/card_base'
import HeaderSearch from '../../components/header/headerSearch'
import {
  reportersActions,
  selectCategories,
  selectListCampaignReporters,
  selectOffsetReporters,
} from '../../feature/Reporters/reporters.slice'
import {Area} from '../../types/area.type'
import {Campaign} from '../../types/campaign.type'
import {Categories} from '../../types/categories.type'

const useStyles = makeStyles({
  reporters_container: {
    '&>div:last-child': {
      '&>div': {
        padding: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
  },
})

const ReportersPage = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const offsetReporters = useAppSelector(selectOffsetReporters)
  const [offset, setOffset] = useState<number>(offsetReporters)
  const [limit, setLimit] = useState(30)
  const [title, setTitle] = useState('전체')
  const [areaIds, setAreaIds] = useState<Area[]>([])
  const dispatch = useAppDispatch()
  const listCampaignReporters: Campaign[] = useAppSelector(
    selectListCampaignReporters
  )
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
      reportersActions.getCategories({tabId: 4, categoryId: 0, limit: 20})
    )
  }, [dispatch])
  useEffect(() => {
    const newAreaIds = areaIds.map((item) => {
      return item.id
    })
    dispatch(
      reportersActions.getListCampaignReporters({
        tabId: 4,
        categoryId: value !== 0 ? value + 20 : value,
        limit: limit,
        medias: JSON.stringify(medias),
        tagIds: JSON.stringify(tagIds),
        sortBy: columsfilter,
        areaIds: JSON.stringify(newAreaIds),
      })
    )
  }, [value, dispatch, limit, medias, tagIds, columsfilter, areaIds])
  return (
    <div className={classes.reporters_container}>
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
        dataLength={listCampaignReporters.length}
        next={() => setOffset(offset + 10)}
        hasMore={true}
        loader={<></>}
      >
        {listCampaignReporters
          .filter((item) => item.status === 1)
          .map((item) => {
            return <CardBase key={item.id} data={item} />
          })}
      </InfiniteScroll>
    </div>
  )
}

export default ReportersPage
