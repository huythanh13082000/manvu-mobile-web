import {makeStyles} from '@mui/styles'
import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import CardBase from '../../components/card_base'
import Filter from '../../components/filter'
import {
  homeActions,
  homeState,
  selectListCampaign,
  selectOffset,
} from '../../feature/campaign_favourate/campaignFavirate.slice'
import {Area} from '../../types/area.type'

const useStyles = makeStyles({
  campaign_Favourite_container: {
    '&>div:last-child': {
      '&>div': {
        padding: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
  },
})

const CampaignFavourite = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const listCampaign: homeState = useAppSelector(selectListCampaign)
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

  useEffect(() => {
    const newAreaIds = areaIds.map((item) => {
      return item.id
    })
    dispatch(
      homeActions.getListCampaignSort({
        limit: limit,
        offset: offset,
        medias: JSON.stringify(medias),
        tagIds: JSON.stringify(tagIds),
        sortBy: columsfilter,
        areaIds: JSON.stringify(newAreaIds),
        status: JSON.stringify([1]),
        filterLiked: true,
      })
    )
  }, [dispatch, limit, offset, medias, tagIds, columsfilter, areaIds])
  return (
    <div className={classes.campaign_Favourite_container}>
      <AppBarCustom title='찜한 목록' />
      {/* <Filter
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
      /> */}
      <InfiniteScroll
        dataLength={listCampaign.list.length}
        next={() => setOffset(offset + 5)}
        hasMore={true}
        loader={<></>}
      >
        {listCampaign.list
          .filter((item) => item.status === 1)
          .map((item) => (
            <CardBase key={item.id} data={item} />
          ))}
      </InfiniteScroll>
    </div>
  )
}

export default CampaignFavourite
