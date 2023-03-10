import {useState} from 'react'
import vIcon from '../../asset/images/v_payment.png'
import {PackageType} from '../../types/package.type'
import './packageRevuNew.css'

const PackageRevuNew = (props: PackageType) => {
  const [status, setStatus] = useState(false)
  return (
    <div className='packageRevu-container-new'>
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

      {props.description.map((item) => {
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #A2A5AA',
          padding: '0.5rem 0',
        }}
      >
        <span style={{fontWeight: 700, fontSize: '16px'}}>Total:</span>{' '}
        <span
          style={{fontWeight: 700, fontSize: '16px'}}
          onClick={() => setStatus(!status)}
        >
          {props.point}
        </span>
      </div>
    </div>
  )
}

export default PackageRevuNew
