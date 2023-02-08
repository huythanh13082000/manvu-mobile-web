import React from 'react'

const IconNoteMenu = (props: {color?: string}) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_598_2141)'>
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M9.99967 2.50001C5.85754 2.50001 2.49967 5.85787 2.49967 10C2.49967 14.1421 5.85754 17.5 9.99967 17.5C14.1418 17.5 17.4997 14.1421 17.4997 10C17.4997 5.85787 14.1418 2.50001 9.99967 2.50001ZM0.833008 10C0.833008 4.9374 4.93706 0.833344 9.99967 0.833344C15.0623 0.833344 19.1663 4.9374 19.1663 10C19.1663 15.0626 15.0623 19.1667 9.99967 19.1667C4.93706 19.1667 0.833008 15.0626 0.833008 10Z'
          fill={props.color ? props.color : '#4D4D4D'}
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M10.0003 5.83334C10.4606 5.83334 10.8337 6.20644 10.8337 6.66668V10C10.8337 10.4602 10.4606 10.8333 10.0003 10.8333C9.54009 10.8333 9.16699 10.4602 9.16699 10V6.66668C9.16699 6.20644 9.54009 5.83334 10.0003 5.83334Z'
          fill={props.color ? props.color : '#4D4D4D'}
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M9.16699 13.3333C9.16699 12.8731 9.54009 12.5 10.0003 12.5H10.0087C10.4689 12.5 10.842 12.8731 10.842 13.3333C10.842 13.7936 10.4689 14.1667 10.0087 14.1667H10.0003C9.54009 14.1667 9.16699 13.7936 9.16699 13.3333Z'
          fill={props.color ? props.color : '#4D4D4D'}
        />
      </g>
      <defs>
        <clipPath id='clip0_598_2141'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IconNoteMenu
