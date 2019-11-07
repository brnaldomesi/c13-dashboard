import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

import logo from './logo-beta.svg'
import styles from './styles'

const useStyles = makeStyles(styles)

export const Logo = () => {
  const classes = useStyles()
  return (
    <Link to="/">
      <img src={logo} alt="Cadence13" className={classes.logo} />
    </Link>
  )
}

export default Logo
