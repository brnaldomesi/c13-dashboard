import Content from 'components/Content'
import Header from 'components/Header'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const LoginLayout = ({ children }) => {
  const classes = useStyles()

  return (
    <div>
      <Header />
      <Content className={classes.content}>{children}</Content>
    </div>
  )
}

export default LoginLayout
