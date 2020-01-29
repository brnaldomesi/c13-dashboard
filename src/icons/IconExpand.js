import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const IconExpand = props => (
  <SvgIcon x="0px" y="0px" viewBox="0 0 24 24" {...props}>
    <g>
      <g>
        <circle style={{ fill: '#fff' }} cx="12" cy="12" r="10" />
      </g>
      <path
        d="M10,6.7c-0.4,0.4-0.4,1,0,1.4l3.9,3.9L10,15.9c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l4.6-4.6c0.4-0.4,0.4-1,0-1.4
        l-4.6-4.6C11,6.3,10.4,6.3,10,6.7z"
      />
    </g>
  </SvgIcon>
)

export default IconExpand
