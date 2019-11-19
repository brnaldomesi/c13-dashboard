import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './styles'

const useStyles = makeStyles(styles)

const SidebarSubItem = ({ text, onClick, selected, disabled }) => {
  const classes = useStyles()
  const item = (
    <ListItem button={!disabled} className={classes.root} onClick={disabled ? undefined : onClick} selected={selected}>
      <ListItemText primary={text} className={classes.text} />
    </ListItem>
  )

  return disabled ? (
    item
  ) : (
    <Tooltip title={text} placement="right">
      {item}
    </Tooltip>
  )
}

export default SidebarSubItem
