import {makeStyles} from '@mui/styles'
import {useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import {IMAGE_URL} from '../../constants'
import {selectUser} from '../../feature/user/user.slice'
import arrowBig from '../../asset/icons/arrow_big.png'
import buttomImage from '../../asset/icons/button.png'
import noteIcon from '../../asset/icons/note.png'
import {numberWithCommas} from '../../utils'

const useStyles = makeStyles({
  service_center_container: {
    '&>div:nth-of-type(1)': {
      padding: '0.5rem 1rem',
      '&>div': {
        padding: '1rem',
        display: 'flex',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        alignItems: 'start',
        justifyContent: 'space-between',
        '&>div': {
          '&>span': {
            fontWeight: 400,
            fontSize: '16px',
          },
          '&>p': {
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '42px',
            padding: 0,
          },
        },
      },
    },
    '&>div:nth-of-type(3)': {},
  },
})

const ServiceCenter = () => {
  const classes = useStyles()
  const user = useAppSelector(selectUser)
  return (
    <div className={classes.service_center_container}>
      <AppBarCustom
        title='강기연님'
        imageUrl={`${IMAGE_URL}${user.profile?.avatar}`}
      />
      <div>
        <div>
          <div>
            <span>현재 나의 포인트</span>
            <p>{numberWithCommas(Number(user.profile?.point))} P</p>
            <img src={buttomImage} alt='' />
            <span>
              <img
                src={noteIcon}
                alt=''
                style={{margin: '0 0 0.5rem 0.5rem'}}
              />
            </span>
          </div>
          <img src={arrowBig} alt='' style={{width: '130px'}} />
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default ServiceCenter
