import { Container, Paper } from '@material-ui/core'
import UserForm, { validationSchema } from '../../components/UserForm'

import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createUser } from 'redux/modules/profiles'
import { formSubmit } from 'utils/form'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router-dom'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  networkId: '',
  seriesIds: []
}

export const UserNew = ({ history, createUser }) => {
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = (values, actions) => {
    return formSubmit(
      createUser,
      {
        data: values,
        success: () => {
          enqueueSnackbar('Check your email to activate your account!', { variant: SNACKBAR_TYPE.SUCCESS })
          history.push('/users')
        },
        fail: err => {
          enqueueSnackbar(err.data.message, { variant: SNACKBAR_TYPE.ERROR })
        }
      },
      actions
    )
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h6" gutterBottom>
        Create a New User
      </Typography>
      <Paper>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur
          validationSchema={validationSchema}>
          {formikProps => (
            <UserForm
              {...formikProps}
              networkDropdownState={{
                visibility: false,
                disabled: false
              }}
            />
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

UserNew.propTypes = {
  history: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
}

const actions = {
  createUser
}

export default compose(
  withRouter,
  connect(
    null,
    actions
  )
)(UserNew)
