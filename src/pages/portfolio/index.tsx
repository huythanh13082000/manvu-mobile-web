import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  withStyles,
} from '@material-ui/core'
import {green} from '@material-ui/core/colors'
import {makeStyles} from '@mui/styles'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import {useState} from 'react'
import {Pagination} from '@material-ui/lab'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../router/routes'
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  portfolioAction,
  selectListPortfolio,
  selectTotalPortfolio,
} from '../../feature/portfolio/portfolioSlice'

const useStyles = makeStyles({
  container_portfolio: {
    background: 'white',
    margin: '1rem',
    '&>div:nth-child(1)': {
      width: '100%',
      height: '500px',
      background: 'white',
      '&>div:nth-child(3)': {
        '&>div': {
          display: 'flex',
          padding: '0.3rem 1rem',
          border: '1px solid rgba(196, 196, 196, 0.5)',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&>div': {},
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
        '&>button': {
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          fontFamily: 'Noto Sans KR',
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

const Portfolio = () => {
  const classes = useStyles()
  const [selectList, selectListData] = useState<number[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const listPortfolio = useAppSelector(selectListPortfolio)
  const total = useAppSelector(selectTotalPortfolio)
  const [page, setPage] = React.useState(1)
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }
  useEffect(() => {
    dispatch(portfolioAction.get({page, perPage: 10}))
  }, [dispatch, page])

  const handleClick = (id: number) => {
    if (selectList.includes(id)) {
      selectListData([...selectList.filter((item) => item !== id)])
    } else {
      selectListData([...selectList, id])
    }
  }
  const handleDelele= ()=>{
    
  }

  return (
    <div className={classes.container_portfolio}>
      <div>
        <div>
          포트폴리오{' '}
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(ROUTE.CREATE_PORTFOLIO)}
          >
            <AddIcon />
            추가
          </Button>
        </div>
        <div>
          <FormControlLabel
            control={
              <GreenCheckbox
                // checked={state.checkedG}
                // onChange={handleChange}
                name='checkedG'
              />
            }
            label=''
          />
          {selectList.length > 0 && (
            <Button variant='contained' color='secondary'>
              <DeleteOutlineIcon /> 삭제
            </Button>
          )}
        </div>
        <div>
          {listPortfolio.map((item) => (
            <div>
              <div>
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      // checked={state.checkedG}
                      // onChange={handleChange}
                      name='checkedG'
                    />
                  }
                  label=''
                  onClick={() =>
                    item.portfolio_id && handleClick(item.portfolio_id)
                  }
                />
                <span
                  onClick={() =>
                    navigate(`/update_portfolio/${item.portfolio_id}`)
                  }
                >
                  {item.title}
                </span>
              </div>
              <div>
                <ArrowUpwardIcon style={{marginRight: '1rem'}} />
                <ArrowDownwardIcon />
              </div>
            </div>
          ))}
        </div>

        <div>
          <Pagination
            showFirstButton
            showLastButton
            page={total && total / 10}
            onChange={handleChangePagination}
          />
        </div>
      </div>
    </div>
  )
}

export default Portfolio
