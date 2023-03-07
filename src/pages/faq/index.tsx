import {Accordion, AccordionSummary, Box, Tab, Tabs} from '@mui/material'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {makeStyles} from '@mui/styles'
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import AppBarCustom from '../../components/appbar'
import {
  faqActions,
  selectListFaqDetail,
  selectListTabFaq,
} from '../../feature/faq/fag.slice'
import moment from 'moment'

const useStyles = makeStyles({
  faq_container: {},
})

const Faq = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  useEffect(() => {
    dispatch(faqActions.getListTabFaq())
  }, [dispatch])
  const listTabFaq = useAppSelector(selectListTabFaq)
  useEffect(() => {
    listTabFaq.length > 0 &&
      dispatch(faqActions.getListFaqDetail(listTabFaq[0].id))
  }, [listTabFaq, dispatch])
  const listFaqDetail = useAppSelector(selectListFaqDetail)

  return (
    <div className={classes.faq_container}>
      <AppBarCustom title='공지사항' />
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label='Tabs where each tab needs to be selected manually'
        style={{borderBottom: '1px solid #C4C4C4'}}
      >
        {listTabFaq.map((item) => {
          return (
            <Tab
              label={item.title}
              key={item.id}
              onClick={() => {
                dispatch(faqActions.getListFaqDetail(item.id))
              }}
            />
          )
        })}
      </Tabs>
      {listFaqDetail.map((item) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Box>
              <Typography>{item.title}</Typography>
              <Typography>
                {moment(item.createdAt).format('hh:mm a DD/MM/YYYY')}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div
                style={{fontFamily: 'Noto Sans KR'}}
                dangerouslySetInnerHTML={{__html: item.content}}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* {value === 0 ? <>1</> : null}
      {value === 1 ? <>2</> : null}
      {value === 2 ? <>3</> : null} */}
    </div>
  )
}

export default Faq
