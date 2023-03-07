import {Grid} from '@mui/material'
import moment from 'moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import './WithdrawalHistory.css'
import {Withdraw, WithdrawMoney} from '../../types/withdraw.type'
import {TEXT_COLOR_WH} from '../../constants'
import {numberWithCommas} from '../../utils'

interface Props {
  data: Withdraw
  setShowWithdrawMoney: () => void
  setDataWithdrawMoney: (e: WithdrawMoney) => void
}

const ComponentWH = (props: Props) => {
  return (
    <Grid>
      <Grid
        item
        xs={12}
        container
        alignItems='center'
        width='100%'
        borderBottom='0.5px solid #A2A5AA'
        paddingBottom='1rem'
      >
        <Grid item xs={12}>
          {props.data.status === 0 && (
            <div style={{display: 'flex', justifyContent: 'end'}}>
              <span
                onClick={() => {
                  props.setDataWithdrawMoney({
                    point: props.data.point,
                    recipientInformation: {...props.data.recipientInformation},
                    status: props.data.status,
                    id: props.data.id,
                  })
                  props.setShowWithdrawMoney()
                }}
              >
                <MoreHorizIcon style={{margin: 0, padding: 0}} />
              </span>
            </div>
          )}
          <Grid
            item
            xs={12}
            container
            alignItems='center'
            justifyContent={'space-between'}
          >
            <p className='wh-p1'>{props.data.recipientInformation.bankName}</p>
            <p className='point-p1' style={{margin: 0}}>
              {moment(props.data?.createdAt).format('YYYY/MM/DD hh:mm')}
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent={'space-between'}
            alignItems='center'
          >
            <p
              className='wh-p1'
              style={{
                backgroundColor:
                  TEXT_COLOR_WH[`${props.data.status}`].background,
                width: '100px',
                display: 'flex',
                justifyContent: 'center',
                padding: '8px 0',
                margin: '0',
                borderRadius: '360px',
              }}
            >
              <span
                style={{
                  color: TEXT_COLOR_WH[`${props.data.status}`].color,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={TEXT_COLOR_WH[`${props.data.status}`].icon}
                  alt=''
                  style={{width: '20px', height: '20px'}}
                />{' '}
                {TEXT_COLOR_WH[`${props.data.status}`].text}
              </span>
            </p>
            <span
              className='point-p4'
              style={{
                fontSize: '19px',
                color: TEXT_COLOR_WH[`${props.data.status}`].colorPoint,
              }}
            >
              - {numberWithCommas(Number(props.data?.point))} P
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ComponentWH
