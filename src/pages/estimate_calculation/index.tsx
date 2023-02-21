import {makeStyles} from '@material-ui/core'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import DialogCreate from './dialog'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import egeScan from '../../asset/images/eye-scan.png'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined'
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import ColorizeIcon from '@material-ui/icons/Colorize'
import {LIST_TAG} from '../../constants'

const useStyles = makeStyles({
  container_estimate_calculation: {
    padding: '1rem',
    '& .MuiMenuItem-root': {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      color: '#4D4D4D',
      fontFamily: 'Noto Sans KR',
      fontStyle: 'normal',
    },
    '&>div': {
      display: 'flex',
      '&>div': {
        borderRadius: '4px',
      },
      '&>div:nth-child(1)': {
        width: '20%',
        marginRight: '1rem',
        background: 'white',
        '&>p': {
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '27px',
        },
        '&>p:hover': {
          background: '#C8E4FA',
          color: '#215DFC',
        },
      },
      '&>div:nth-child(2)': {
        width: '60%',
        '&>div': {
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
          background: 'white',
          marginBottom: '1rem',
          '&>div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1rem ',
            background: '#F1F5F9',
            '&>button': {
              background: '#0065F2',
              width: '85px',
              height: '34px',
              fontWeight: 500,
              fontSize: '14px',
              fontFamily: 'Pretendard',
            },
            '&>p': {
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '27px',
              color: '#13191D',
            },
          },
          '&>p': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            justifyContent: 'space-between',
            margin: 0,
            borderBottom: '0.5px solid #D1D5DB',
            '&>img': {
              width: '24px',
              height: '24px',
            },
            '&>p:nth-of-type(1)': {
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#4B5563',
              width: '60%',
            },
            '&>p:nth-of-type(2)': {
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#000000',
            },
          },
        },
      },
    },
  },
})

const EstimateCalculation = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [type, setType] = useState<'UX_UI' | 'APP' | 'WEB' | 'ADMIN_PAGE'>(
    'UX_UI'
  )
  const [tag, setTag] = useState<string>('UI_PAGE')
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className={classes.container_estimate_calculation}>
      <div>
        <div>
          <p
            style={
              type === 'UX_UI' ? {background: '#C8E4FA', color: '#215DFC'} : {}
            }
            onClick={() => setType('UX_UI')}
          >
            UI/UX 디자인 <ChevronRightIcon />
          </p>
          <p
            style={
              type === 'APP' ? {background: '#C8E4FA', color: '#215DFC'} : {}
            }
            onClick={() => setType('APP')}
          >
            APP <ChevronRightIcon />
          </p>
          <p
            style={
              type === 'WEB' ? {background: '#C8E4FA', color: '#215DFC'} : {}
            }
            onClick={() => setType('WEB')}
          >
            WEB <ChevronRightIcon />
          </p>
          <p
            style={
              type === 'ADMIN_PAGE'
                ? {background: '#C8E4FA', color: '#215DFC'}
                : {}
            }
            onClick={() => setType('ADMIN_PAGE')}
          >
            관리자 페이지 <ChevronRightIcon />
          </p>
        </div>
        <div>
          {LIST_TAG.map((item) => (
            <div key={item}>
              <div>
                <p>{item}</p>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    setOpen(true)
                    setTag(item)
                  }}
                >
                  <AddIcon />
                  추가
                </Button>
              </div>
              <p>
                <p>10 페이지 이하</p>
                <p> 100,000원</p>
                <img src={egeScan} alt='' />
                <span onClick={handleClick}>
                  <MoreVertIcon />
                </span>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <ArrowUpwardOutlinedIcon />
                    위로이동
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ArrowDownwardOutlinedIcon />
                    아래로 이동
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <DeleteForeverOutlinedIcon />
                    삭제
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ColorizeIcon />
                    수정
                  </MenuItem>
                </Menu>
              </p>
            </div>
          ))}
        </div>
      </div>
      <DialogCreate
        open={open}
        setOpen={() => setOpen(false)}
        type={type}
        tag={tag}
      />
    </div>
  )
}

export default EstimateCalculation
