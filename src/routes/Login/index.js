import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Base64 } from 'js-base64'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'

import LoginForm from './LoginForm'
import styles from './styles'
import { formSubmit } from 'utils/form'
import { authLogin } from 'redux/modules/auth'
import { SNACKBAR_TYPE } from 'config/constants'
import { isNotAuthenticatedOrRedir } from 'hocs/withAuth'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
})

const initialValues = {
  username: '',
  password: ''
}

const Login = props => {
  const { classes } = props
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (values, formActions) => {
    const { authLogin } = props
    const userInfo = Base64.encode(`${values.username}:${values.password}`)
    return formSubmit(
      authLogin,
      {
        headers: {
          Authorization: 'Basic ' + userInfo
        },
        success: () => enqueueSnackbar('Logged in successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
      },
      formActions
    )
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center" gutterBottom>
        Login
      </Typography>
      <Formik
        component={LoginForm}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      />
    </Paper>
  )
}

Login.propTypes = {
  authLogin: PropTypes.func.isRequired,
  classes: PropTypes.object
}

const actions = {
  authLogin
}

export default compose(
  isNotAuthenticatedOrRedir,
  connect(
    null,
    actions
  ),
  withStyles(styles)
)(Login)
