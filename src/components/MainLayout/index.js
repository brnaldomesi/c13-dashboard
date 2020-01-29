import React, { useState } from 'react'

import Content from 'components/Content'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { withRouter } from 'react-router'

const useStyles = makeStyles(styles)

const MainLayout = ({ children, location }) => {
  const [sidebarOpen, toggleSidebar] = useState(true)
  const classes = useStyles({ sidebarOpen })

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar toggle={toggleSidebar} open={sidebarOpen} />
      <Content className={classes.content}>{children}</Content>
    </div>
  )
}

export default withRouter(MainLayout)
