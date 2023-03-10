import Box from '@mui/material/Box/Box'
import {Grid} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import CardBase from '../../components/card_base'
import Filter from '../../components/filter'
import HeaderSearch from '../../components/header/headerSearch'
import {
  campaignActions,
  selectListCampaign,
  selectOffset,
} from '../../feature/campaign/campaign.slice'
import {Area} from '../../types/area.type'
import {Campaign} from '../../types/campaign.type'

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

const Home = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
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

      <Box bgcolor={'#F6F6F6'} padding='0.7rem 0'>
        <Grid container justifyContent={'space-between'}>
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
        </Grid>
      </Box>
      <InfiniteScroll
        dataLength={listCampaign.length}
        next={() => setOffset(offset + 5)}
        hasMore={true}
        loader={<></>}
      >
        {listCampaign
          .filter((item) => item.status === 1)
          .map((item) => (
            <CardBase key={item.id} data={item} />
          ))}
      </InfiniteScroll>
    </div>
  )
}

export default Home
