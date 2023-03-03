import React from 'react'
import copy from '../../asset/icons/copy.png'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {useAppDispatch} from '../../app/hooks'
import {snackBarActions} from '../snackbar/snackbarSlice'

const Copy = (props: {text: string; copy: string}) => {
  const dispatch = useAppDispatch()
  return (
    <CopyToClipboard text={props.copy}>
      <span
        style={{fontWeight: 400, fontSize: '12px', color: '#8500FF'}}
        onClick={() =>
          dispatch(
            snackBarActions.setStateSnackBar({
              content: '복사 되었습니다.',
              type: 'success',
            })
          )
        }
      >
        <img src={copy} alt='' />
        <span>{props.text}</span>
      </span>
    </CopyToClipboard>
  )
}

export default Copy
