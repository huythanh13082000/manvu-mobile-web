import {Grid} from '@mui/material'
import {useEffect, useState} from 'react'
import {FILE_API} from '../../apis/urlConfig'
import {COLOR_QUESTION_TYPE, TEXT_QUESTION_TYPE} from '../../constants'
import {Question} from '../../types/question.type'
import './CardRequest.css'

const CardRequest = (props: Question) => {
  const [color, setColor] = useState('')
  const [colorbg, setColorbg] = useState('')
  useEffect(() => {
    switch (props.status) {
      case 'PENDING':
        setColor('#5290E3')
        setColorbg('#DFEEFF')
        break
      case 'MORE':
        setColor('#FF1400')
        setColorbg('#FFC7C7')
        break
      case 'COMPLETED':
        setColor('#2BB81F')
        setColorbg('#D2FFCE')
        break
      default:
        break
    }
  }, [props.status])

  return (
    <Grid
      item
      xs={12}
      container
      alignItems='center'
      height='120px'
      borderBottom={'1px solid rgba(213, 213, 222, 0.7)'}
    >
      <Grid item xs={3} margin='1rem 0 1rem 1rem '>
        <img
          src={
            props.images && props.images.length !== 0
              ? `${FILE_API}${props.images[0]}`
              : '/img/Sell-Your-Product.png'
          }
          alt='img'
          style={{
            width: '70px',
            height: '72px',
            borderRadius: '5px',
            objectFit: 'cover',
          }}
        />
      </Grid>

      <Grid item xs={8}>
        <p className='cr-p1'>
          <span style={{color: COLOR_QUESTION_TYPE[`${props.type}`]}}>
            [{TEXT_QUESTION_TYPE[`${props.type}`]}]
          </span>
          {props.category}
        </p>
        <Grid container alignItems='center' item xs={12}>
          <p className='cr-p2'>상태:</p>
          <p className='cr-p3' style={{color: color, backgroundColor: colorbg}}>
            추가 질문
          </p>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardRequest
