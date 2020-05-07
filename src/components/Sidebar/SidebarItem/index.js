import React from 'react'
import { Link } from 'react-router-dom'
import { Link as MaterialUILink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import styles from './styles'

const useStyles = makeStyles(styles)

const SidebarItem = ({ icon, text, to, href, onClick, open, hasSubItems }) => {
  const Icon = icon
  const classes = useStyles()
  let classString = classes.root
  let linkComponent = undefined
  if (to) {
    linkComponent = Link
  } else if (href) {
    linkComponent = MaterialUILink
    classString = `${classString} ${classes.link}`
  }
  return (
    <ListItem button component={linkComponent} href={href} to={to} onClick={onClick} className={classString}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
      {hasSubItems && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItem>
  )
}

export default SidebarItem
