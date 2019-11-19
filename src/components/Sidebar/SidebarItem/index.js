import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import styles from './styles'

const useStyles = makeStyles(styles)

const SidebarItem = ({ icon, text, to, onClick, open, hasSubItems }) => {
  const Icon = icon
  const classes = useStyles()
  return (
    <ListItem button component={to ? Link : undefined} to={to} onClick={onClick} className={classes.root}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
      {hasSubItems && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItem>
  )
}

export default SidebarItem
