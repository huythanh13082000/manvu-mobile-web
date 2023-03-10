import {makeStyles} from '@mui/styles'
import React from 'react'
import {useAppSelector} from '../../app/hooks'
import loadingGif from '../../asset/gif/loading.gif'
import {SelectLoading} from './loadingSlice'

const useStyles = makeStyles({
  loader_container: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    background: `white url("${loadingGif}") center no-repeat`,
    opacity: '0.5',
    zIndex: 10000,
    top: 0,
  },
})

const Loading = () => {
  const loading = useAppSelector(SelectLoading)
  const classes = useStyles()
  return <>{loading && <div className={classes.loader_container}></div>}</>
}

export default Loading
