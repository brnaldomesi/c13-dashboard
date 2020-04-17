import * as Yup from 'yup'

import React, { useEffect } from 'react'
import { authResetPassword, authValidateToken } from 'redux/modules/auth'

import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import ResetPasswordForm from './ResetPasswordForm'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formSubmit } from 'utils/form'
import styles from '../../Login/styles'
import { useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref('password')], 'Password do not match.')
  })
})

const initialValues = {
  password: '',
  confirmPassword: ''
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const ResetPassword = props => {
  const { classes, history, authValidateToken } = props
  const { enqueueSnackbar } = useSnackbar()
  const query = useQuery()
  const data = {
    token: query.get('token')
  }

  useEffect(() => {
    authValidateToken({
      data,
      fail: res => {
        enqueueSnackbar('Token expired.', { variant: SNACKBAR_TYPE.ERROR })
        history.push('/login')
      }
    })
  }, [authValidateToken, enqueueSnackbar, history, data])

  const handleSubmit = (values, formActions) => {
    const { authResetPassword } = props
    const data = {
      password: values.password,
      token: query.get('token')
    }

    return formSubmit(
      authResetPassword,
      {
        data,
        success: () => {
          enqueueSnackbar('Password reset successfully.', { variant: SNACKBAR_TYPE.SUCCESS })
          history.push('/login')
        }
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
        component={ResetPasswordForm}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      />
    </Paper>
  )
}

ResetPassword.propTypes = {
  authValidateToken: PropTypes.func.isRequired,
  authResetPassword: PropTypes.func.isRequired,
  classes: PropTypes.object
}

const actions = {
  authValidateToken,
  authResetPassword
}

export default compose(
  connect(
    null,
    actions
  ),
  withStyles(styles)
)(ResetPassword)
