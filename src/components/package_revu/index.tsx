import {PackageType} from '../../types/package.type'
import vIcon from '../../asset/images/v_payment.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import './packageRevu.css'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const PackageRevu = (props: PackageType) => {
  const [status, setStatus] = useState(false)
  const navigate= useNavigate()
  return (
    <div className='packageRevu-container'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <div>
          <span className='packageRevu-recomend'>{props.recomend}</span>
          <p className='packageRevu-name'>{props.name}</p>
        </div>
        <img src={props.img} alt='' style={{width: '42px', height: '42px'}} />
      </div>
      <p className='packageRevu-point'>
        <span>{props.point}</span>{' '}
        <span
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#0078FF',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => setStatus(!status)}
        >
          Detail {!status ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </span>
      </p>

      {status &&
        props.description.map((item) => {
          return (
            <div
              key={item}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '14px 0',
              }}
            >
              <span className='packageRevu-description'>{item}</span>
              <img src={vIcon} alt='' style={{width: '18px', height: '17px'}} />
            </div>
          )
        })}
      {props.suggest && (
        <>
          <p className='packageRevu-suggest'>{props.suggest}</p>
          <span className='packageRevu-triangle'></span>
        </>
      )}
      <div
        style={{display: 'flex', justifyContent: 'center'}}
        onClick={() => {
          navigate(`/payment_bank_credit/${props.name}`)
        }}
      >
        <p style={{color: props.button.color}} className={'packageRevu-button'}>
          {props.button.text}
        </p>
      </div>
    </div>
  )
}

export default PackageRevu
