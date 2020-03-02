import { Container, Paper } from '@material-ui/core'
import React, { useEffect, useMemo } from 'react'
import UserForm, { validationSchema } from '../../components/UserForm'
import { getUserPreference, getUserRoles, userRolesSelector } from 'redux/modules/profiles'

import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import pick from 'lodash/pick'
import { withRouter } from 'react-router-dom'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  networks: ''
}

const getRolesOptions = roles =>
  roles.map(value => ({
    value: value,
    label: value
  }))

export const UserNew = ({ history, createUser, match, roles, getUserRoles, getUserPreference }) => {
  const rolesOptions = useMemo(() => getRolesOptions(roles), [roles])
  useEffect(() => {
    getUserPreference()
  }, [getUserPreference])

  useEffect(() => {
    if (roles.length === 0) {
      getUserRoles()
    }
  }, [getUserRoles, roles.length])

  const handleSubmit = (values, actions) => {
    return formSubmit(
      createUser,
      {
        id: match.params.userId,
        data: pick(values, ['firstName', 'lastName', 'email', 'isActive']),
        success: () => history.push('/users')
      },
      actions
    )
  }

  return (
    <Container maxWidth="xl">
      <Paper>
        {rolesOptions.length > 0 && (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur
            validationSchema={validationSchema}>
            {formikProps => <UserForm {...formikProps} rolesOptions={rolesOptions} networkDropdownState={false} />}
          </Formik>
        )}
      </Paper>
    </Container>
  )
}

UserNew.propTypes = {
  history: PropTypes.object.isRequired,
  getUserRoles: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  roles: userRolesSelector
})

const actions = {
  getUserRoles,
  getUserPreference
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(UserNew)
