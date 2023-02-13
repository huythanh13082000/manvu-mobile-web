import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  withStyles,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {green} from '@material-ui/core/colors'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddIcon from '@material-ui/icons/Add'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import {Pagination} from '@material-ui/lab'
import {makeStyles} from '@mui/styles'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  orderProjectAction,
  selectListOrderProject,
  selectTotalOrderProject,
} from '../../feature/order_project/orderProjectSlice'
import {ROUTE} from '../../router/routes'
import excel from '../../asset/images/excel.png'
import pdf from '../../asset/images/pdf.png'
import {BASE_URL} from '../../constants'

const useStyles = makeStyles({
  container_portfolio: {
    background: 'white',
    margin: '1rem',
    '&>div:nth-child(1)': {
      width: '100%',
      minHeight: '80vh',
      background: 'white',
      '&>div:nth-child(3)': {
        '&>div': {
          display: 'flex',
          padding: '0.3rem 1rem',
          borderTop: '1px solid rgba(196, 196, 196, 0.5)',
          background: '#F3F4F6',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&>span': {
            color: '#4D4D4D',
            '&>span:nth-child(2)': {
              display: 'inline-block',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '16px',
              color: '#F22828',
              background: 'rgba(242, 40, 40, 0.3)',
              borderRadius: '16px',
              padding: '4px 0',
              marginLeft: '16px',
              width: '63px',
              textAlign: 'center',
            },
          },
          '&>p': {
            color: '#4D4D4D',
            '&>span': {
              color: '#4D4D4D',
            },
            '&>p': {
              margin: '5px 0 0 0',
              '&>a': {
                textDecoration: 'none',
                color: '#C4C4C4',
                fontWeight: 400,
                fontSize: '14px',
                '&>span': {
                  display: 'flex',
                  width: '132px',
                  height: '32px',
                  border: '1px solid #C4C4C4',
                  borderRadius: '24px',
                  alignItems: 'center',
                  padding: '0 10px',
                  '&>img': {
                    width: '18px',
                    height: '18px',
                  },
                  '&>div': {
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '24px',
                  },
                },
              },
            },
          },
        },
      },
      '&>div:nth-child(1)': {
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#13191D',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        '&>button': {
          background: '#0065F2',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          fontFamily: 'Noto Sans KR',
        },
      },
      '&>div:nth-child(2)': {
        padding: '0.3rem 1rem',
        display: 'flex',
        '&>button': {
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          fontFamily: 'Noto Sans KR',
        },
        '&>span': {
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&>div': {
            '&>p': {
              color: '#4D4D4D',
              cursor: 'pointer',
            },
            '&>p:hover': {
              background: '#F6F6F6',
            },
          },
        },
      },
      '&>div:nth-child(4)': {
        display: 'flex',
        justifyContent: 'center',
        padding: '0.3rem 1rem',
      },
    },
  },
})

const GreenCheckbox = withStyles({
  root: {
    color: 'rgba(77, 77, 77, 0.7)',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color='default' {...props} />)

const DevelopmentInquiry = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const listOrderProject = useAppSelector(selectListOrderProject)
  const total = useAppSelector(selectTotalOrderProject)
  const [page, setPage] = useState<number>(1)
  const [selectList, selectListData] = useState<string[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClick = (id: string) => {
    if (selectList.includes(id)) {
      selectListData([...selectList.filter((item) => item !== id)])
    } else {
      selectListData([...selectList, id])
    }
  }
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }
  useEffect(() => {
    dispatch(orderProjectAction.get({page, perPage: 10}))
  }, [dispatch, page])
  return (
    <div className={classes.container_portfolio}>
      <div>
        <div>
          제작문의{' '}
          {/* <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(ROUTE.CREATE_DEVELOPMENT_INQUIRY)}
          >
            <AddIcon />
            추가
          </Button> */}
        </div>
        <div>
          <span>
            <FormControlLabel
              style={{marginRight: '0'}}
              control={
                <GreenCheckbox
                  // checked={state.checkedG}
                  // onChange={handleChange}
                  name='checkedG'
                />
              }
              label=''
            />

            <span onClick={handleClickPopup}>
              <ArrowDropDownIcon />
            </span>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>모두</MenuItem>
              <MenuItem onClick={handleClose}>전제 선택 해제</MenuItem>
              <MenuItem onClick={handleClose}>미완료</MenuItem>
              <MenuItem onClick={handleClose}>처리완료</MenuItem>
            </Menu>
          </span>

          {selectList.length > 0 && (
            <Button variant='contained' color='secondary'>
              <DeleteOutlineIcon /> 삭제
            </Button>
          )}
        </div>
        <div>
          {listOrderProject.map((item) => (
            <div style={item.isDone ? {} : {background: 'white'}}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    // checked={state.checkedG}
                    // onChange={handleChange}
                    name='checkedG'
                  />
                }
                label={item.companyName}
                onClick={() => handleClick('1')}
              />
              <p>
                <span
                  onClick={() =>
                    navigate(`/update_development_inquiry/${item.orderId}`)
                  }
                >
                  {item.projectName}
                </span>{' '}
                - {item.position}
                {item.planFile && (
                  <p>
                    <a href={`${BASE_URL}/${item.planFile}`} target='_blank'>
                      <span>
                        <img
                          src={
                            item.planFile?.toString().includes('.pdf')
                              ? pdf
                              : excel
                          }
                          alt=''
                        />
                        <div>{item.planFile?.toString()}</div>
                      </span>
                    </a>
                  </p>
                )}
              </p>
              <span>
                <span>{moment(item.created_at).locale('ko').format('LT')}</span>{' '}
                <span
                  style={
                    item.isDone
                      ? {
                          color: '#0065F2',
                          background: 'rgba(0, 101, 242, 0.3)',
                        }
                      : {}
                  }
                >
                  {item.isDone ? '미완료' : '완료'}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div>
          <Pagination
            page={total && total / 10}
            onChange={handleChangePagination}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  )
}

export default DevelopmentInquiry
