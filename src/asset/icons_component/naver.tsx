import React from 'react'

const NaverIcon = (props: {color: string}) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width='32'
        height='32'
        rx='16'
        fill='url(#paint0_linear_2117_31379)'
      />
      <path
        d='M24 9V23.6667H19.1118L13.3333 15V23.6667H8V9H13.3333L19.1118 17V9H24Z'
        fill='white'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2117_31379'
          x1='2.81846'
          y1='2.38485'
          x2='29.4854'
          y2='31.2199'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color={props.color} />
          <stop offset='1' stop-color={props.color} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default NaverIcon
