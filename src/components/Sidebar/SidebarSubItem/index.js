import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import styles from './styles'

const useStyles = makeStyles(styles)

const SidebarSubItem = ({ text, onClick, selected }) => {
  const classes = useStyles()
  return (
    <ListItem button className={classes.root} onClick={onClick} selected={selected}>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default SidebarSubItem
