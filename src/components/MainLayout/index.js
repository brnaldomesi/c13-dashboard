import React, { useState } from 'react'
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth'

import Content from 'components/Content'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import { compose } from 'redux'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { withRouter } from 'react-router'

const useStyles = makeStyles(styles)

const MainLayout = ({ children, location, width }) => {
  const [sidebarOpen, toggleSidebar] = useState(isWidthUp('sm', width))
  const matchsXs = isWidthDown('xs', width)
  const classes = useStyles({ sidebarOpen, matchsXs })

  return (
    <div className={classes.root}>
      <Header toggleSidebar={toggleSidebar} matchsXs={matchsXs} />
      <Sidebar toggle={toggleSidebar} open={sidebarOpen} matchsXs={matchsXs} />
      <Content className={classes.content}>{children}</Content>
    </div>
  )
}

export default compose(
  withWidth(),
  withRouter
)(MainLayout)
