import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const IconCollapse = props => (
  <SvgIcon x="0px" y="0px" viewBox="0 0 24 24" {...props}>
    <path style={{ fill: 'none' }} d="M0,0h24v24H0V0z" />
    <g>
      <g>
        <circle style={{ fill: '#fff' }} cx="12" cy="12" r="10" />
      </g>
      <path
        d="M14,6.7c-0.4-0.4-1-0.4-1.4,0L8,11.3c-0.4,0.4-0.4,1,0,1.4l4.6,4.6c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4L10.1,12L14,8.1
        C14.4,7.7,14.4,7.1,14,6.7z"
      />
    </g>
  </SvgIcon>
)

export default IconCollapse
