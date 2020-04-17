import * as Yup from 'yup'

import Cookies from 'js-cookie'
import ForgotPasswordForm from './ForgotPasswordForm'
import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { authForgotPassword } from 'redux/modules/auth'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formSubmit } from 'utils/form'
import styles from '../Login/styles'
import { useSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required')
})

const initialValues = {
  email: ''
}

const ForgotPassword = props => {
  const { classes, history, authForgotPassword } = props
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (values, formActions) => {
    return formSubmit(
      authForgotPassword,
      {
        values,
        success: () => {
          Cookies.set('cadence13_forgotPassword_success', 1)
          history.push({
            pathname: '/forgotPasswordSuccess',
            state: values
          })
        },
        fail: () => enqueueSnackbar('No Profie found', { variant: SNACKBAR_TYPE.WARNING })
      },
      formActions
    )
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <Formik
        component={ForgotPasswordForm}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      />
    </Paper>
  )
}

ForgotPassword.propTypes = {
  authForgotPassword: PropTypes.func.isRequired,
  classes: PropTypes.object
}

const actions = {
  authForgotPassword
}

export default compose(
  connect(
    null,
    actions
  ),
  withStyles(styles)
)(ForgotPassword)
