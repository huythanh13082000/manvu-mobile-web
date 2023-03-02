import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  card_login_sns_container: {
    width: '100%',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    background: '#F6F6F6',
    border: '0.5px solid #A2A5AA',
    borderRadius: '6px',
    margin: '1rem 0',
    justifyContent: 'center',
    cursor: 'pointer',
    '&>img': {
      width: '24px',
      height: '24px',
      marginRight: '8px',
    },
  },
})

const CardLoginSns = (props: {iconUrl: string; text: string}) => {
  const classes = useStyles()
  return (
    <div className={classes.card_login_sns_container}>
      <img src={props.iconUrl} alt='' />
      <span>{props.text}</span>
    </div>
  )
}

export default CardLoginSns
