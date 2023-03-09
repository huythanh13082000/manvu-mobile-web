import {makeStyles} from '@mui/styles'
import React, {useState, useEffect} from 'react'
import AppBarCustom from '../../components/appbar'
import InputBase from '../../components/input'
import searchIcon from '../../asset/icons/search.png'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  homeActions,
  selectListCampaignSearch,
} from '../../feature/campaign_favourate/campaignFavirate.slice'
import CardBase from '../../components/card_base'

const useStyles = makeStyles({
  page_search_container: {
    '&>div:nth-child(2)': {
      padding: '1rem',
      paddingBottom: 0,
    },
    '&>div:nth-child(3)': {
      padding: '0.5rem',
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
})

const PageSearch = () => {
  const classes = useStyles()
  const [keySearch, setKeySearch] = useState('')
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (keySearch)
      dispatch(homeActions.getListCampaignSearch({search: keySearch}))
  }, [dispatch, keySearch])
  const listCampaignSearch = useAppSelector(selectListCampaignSearch)
  return (
    <div className={classes.page_search_container}>
      <AppBarCustom title='검색' />
      <div>
        <InputBase
          onChange={(e) => setKeySearch(e)}
          type='text'
          value={keySearch}
          placeholder='검색'
          iconLeftUrl={searchIcon}
        />
      </div>
      <div>
        {listCampaignSearch
          ?.filter((item) => item.status === 1)
          .map((item) => (
            <CardBase key={item.id} data={item} />
          ))}
      </div>
    </div>
  )
}

export default PageSearch
