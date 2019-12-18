import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './styles'

const useStyles = makeStyles(styles)

const SidebarSubItem = ({ text, onClick, selected, disabled, to }) => {
  const classes = useStyles()
  const item = (
    <ListItem
      button
      component={disabled || !to ? undefined : Link}
      className={classes.root}
      to={to}
      onClick={disabled ? undefined : onClick}
      selected={selected}>
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
