import { Container, Paper } from '@material-ui/core'
import UserForm, { validationSchema } from '../../components/UserForm'

import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formSubmit } from 'utils/form'
import pick from 'lodash/pick'
import { updateUser } from 'redux/modules/profiles'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router-dom'

export const UserEdit = ({ history, updateUser }) => {
  const {
    location: { state: user }
  } = history
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = (values, actions) => {
    const data = pick(
      {
        ...values,
        profileId: user.profileId
      },
      ['firstName', 'lastName', 'email', 'profileId']
    )

    return formSubmit(
      updateUser,
      {
        data,
        success: () => {
          enqueueSnackbar('User updated!', { variant: SNACKBAR_TYPE.SUCCESS })
          history.push({
            pathname: '/users/' + user.profileId,
            state: data
          })
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
        Edit a User
      </Typography>
      <Paper>
        <Formik
          initialValues={user}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur
          validationSchema={validationSchema}>
          {formikProps => (
            <UserForm
              {...formikProps}
              networkDropdownState={{
                visibility: user.role === 'Network User' ? true : false,
                disabled: true
              }}
            />
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

UserEdit.propTypes = {
  updateUser: PropTypes.func.isRequired
}

const actions = {
  updateUser
}

export default compose(
  withRouter,
  connect(
    null,
    actions
  )
)(UserEdit)
