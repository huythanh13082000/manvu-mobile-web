import {makeStyles} from '@material-ui/styles'
import React from 'react'
import {useAppSelector} from '../../app/hooks'
import loading from '../../asset/gif/loading.gif'
import {SelectLoading} from './loadingSlice'

const useStyles = makeStyles({
  loader_container: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    background: `white url("${loading}") center no-repeat`,
    opacity: '0.5',
    zIndex: 1,
  },
})

const Loading = () => {
  const loading = useAppSelector(SelectLoading)
  const classes = useStyles()
  console.log(213213, loading)
  return (
    <>{loading ? <div className={classes.loader_container}></div> : <></>}</>
  )
}

export default Loading
