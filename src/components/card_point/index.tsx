import {Grid} from '@mui/material'
import moment from 'moment'
import {MEDIA_IMAGE_URL} from '../../constants'
import {PointTransaction} from '../../types/pointTransaction.type'
import {numberWithCommas} from '../../utils'
import './point.css'
interface Props {
  data?: PointTransaction
}

const Point = (props: Props) => {
  return (
    <Grid>
      <Grid
        item
        xs={12}
        container
        alignItems='center'
        width='100%'
        justifyContent='space-between'
        borderBottom='0.5px solid #A2A5AA'
      >
        <Grid item xs={8}>
          <Grid item xs={12} container alignItems='center'>
            <p className='point-p1'>
              {moment(props.data?.createdAt).format('hh:mm a DD/MM/YYYY')}
            </p>
            <img
              src={`${MEDIA_IMAGE_URL[props.data?.campaign?.media || '']}`}
              style={{borderRadius: '50%', width: '20px', marginRight: '1rem'}}
              alt=''
            />
          </Grid>
          <Grid item xs={12}>
            <p className='point-p3'>
              제목: {props.data?.meta.title || props.data?.meta.campaignName}
            </p>
          </Grid>
        </Grid>
        <Grid item xs={4} container justifyContent='end'>
          <p className='point-p4'>
            {numberWithCommas(props.data?.point || 0)} P
          </p>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Point
