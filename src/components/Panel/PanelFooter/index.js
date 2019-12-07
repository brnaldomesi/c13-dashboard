import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import CardActions from '@material-ui/core/CardActions'

import styles from './styles'

const useStyles = makeStyles(styles)

const PanelFooter = ({ children }) => {
  const classes = useStyles()
  return <CardActions className={classes.root}>{children}</CardActions>
}

PanelFooter.propTypes = {
  children: PropTypes.node
}

export default PanelFooter
