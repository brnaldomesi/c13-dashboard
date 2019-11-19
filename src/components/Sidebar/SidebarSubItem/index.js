import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './styles'

const useStyles = makeStyles(styles)

const SidebarSubItem = ({ text, onClick, selected }) => {
  const classes = useStyles()
  return (
    <Tooltip title={text} placement="right">
      <ListItem button className={classes.root} onClick={onClick} selected={selected}>
        <ListItemText primary={text} className={classes.text} />
      </ListItem>
    </Tooltip>
  )
}

export default SidebarSubItem
