import React from 'react'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
  container_estimate_calculation: {
    background: 'white',
    margin: '1rem',
    '&>div:nth-child(1)': {
      padding: '1rem',
    },
  },
})

const EstimateCalculation = () => {
  const classes = useStyles()
  return (
    <div className={classes.container_estimate_calculation}>
      <div>
        <span>그룹</span>
      </div>
    </div>
  )
}

export default EstimateCalculation
