import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import DialogCreate from './dialog'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'
import Menu from '@material-ui/core/Menu/Menu'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

const useStyles = makeStyles({
  container_estimate_calculation: {
    background: 'white',
    width: '50%',
    margin: '1rem auto',
    borderRadius: '4px',
    '&>div:nth-child(1)': {
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      '&>span:nth-child(1)': {
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '24px',
        color: '#13191D',
      },
      '&>span:nth-child(2)': {
        width: '32px',
        height: '32px',
        background: '#0065F2',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&>svg': {
          color: 'white',
        },
      },
    },
    '&>div:nth-child(2)': {
      padding: '1rem',
      '&>div:nth-child(1)': {
        display: 'flex',
        justifyContent: 'space-between',
        '&>span:nth-child(1)': {
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '24px',
          color: '#13191D',
          display: 'flex',
          alignItems: 'center',
          '&>span': {
            '&>svg': {
              display: 'inherit',
              margin: 0,
              padding: 0,
            },
          },
        },
        '&>span:nth-child(2)': {
          width: '32px',
          height: '32px',
          background: '#0065F2',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&>svg': {
            color: 'white',
          },
        },
      },
      '&>div:nth-child(2)': {
        '&>ul': {
          margin: 0,
          padding: '0.5rem 1rem',
          '&>li': {
            display: 'flex',
            '&>span:nth-child(1)': {
              fontWeight: 400,
              fontSize: '16px',
              color: '#4D4D4D',
              '&>svg': {
                fontSize: 10,
                color: '#4D4D4D',
              },
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
  const [open, setOpen] = useState(false)
  const [anchorElGroup, setAnchorElGroup] = React.useState<null | HTMLElement>(
    null
  )
  const [anchorElItem, setAnchorElItem] = React.useState<null | HTMLElement>(
    null
  )

  const handleClickMoreGroup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElGroup(event.currentTarget)
  }

  const handleCloseGroup = () => {
    setAnchorElGroup(null)
  }

  const handleClickMoreItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElItem(event.currentTarget)
  }

  const handleCloseItem = () => {
    setAnchorElItem(null)
  }
  return (
    <div className={classes.container_estimate_calculation}>
      <div>
        <span>그룹</span>
        <span onClick={() => setOpen(true)}>
          <AddIcon />
        </span>
      </div>
      <div>
        <div>
          <span>
            플랫폼 및 개발언어{' '}
            <span onClick={handleClickMoreGroup}>
              <MoreVertIcon />
            </span>
            <Menu
              id='simple-menu'
              anchorEl={anchorElGroup}
              keepMounted
              open={Boolean(anchorElGroup)}
              onClose={handleCloseGroup}
            >
              <MenuItem onClick={handleCloseGroup}>
                <ArrowUpwardIcon /> 위로이동
              </MenuItem>
              <MenuItem onClick={handleCloseGroup}>
                <ArrowDownwardIcon /> 아래로 이동
              </MenuItem>
              <MenuItem onClick={handleCloseGroup}>
                <DeleteForeverOutlinedIcon /> 삭제
              </MenuItem>
              <MenuItem onClick={handleCloseGroup}>
                <EditOutlinedIcon /> 수정
              </MenuItem>
            </Menu>
          </span>
          <span onClick={() => navigate(ROUTE.CREATE_ESTIMATE_CALCULATION)}>
            <AddIcon />
          </span>
        </div>
        <div>
          <ul>
            <li>
              <span>
                <FiberManualRecordIcon /> 알림기능 1기능
              </span>
              <span onClick={handleClickMoreItem}>
                <MoreVertIcon />
              </span>
              <Menu
                id='simple-menu'
                anchorEl={anchorElItem}
                keepMounted
                open={Boolean(anchorElItem)}
                onClose={handleCloseItem}
              >
                <MenuItem onClick={handleCloseItem}>
                  <ArrowUpwardIcon /> 위로이동
                </MenuItem>
                <MenuItem onClick={handleCloseItem}>
                  <ArrowDownwardIcon /> 아래로 이동
                </MenuItem>
                <MenuItem onClick={handleCloseItem}>
                  <DeleteForeverOutlinedIcon /> 삭제
                </MenuItem>
                <MenuItem onClick={handleCloseItem}>
                  <EditOutlinedIcon /> 수정
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
      <DialogCreate open={open} setOpen={() => setOpen(false)} />
    </div>
  )
}

export default EstimateCalculation
