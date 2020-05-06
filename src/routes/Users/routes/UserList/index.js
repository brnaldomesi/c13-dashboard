import {
  confirmAndDeleteUser,
  getUsersList,
  userDeletingSelector,
  usersListLoadingSelector,
  usersListSelector
} from 'redux/modules/users'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import LoadingIndicator from 'components/LoadingIndicator'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import React from 'react'
import { SNACKBAR_TYPE } from 'config/constants'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router-dom'

const columns = [
  { title: 'Name', field: 'fullName' },
  { title: 'Network', field: 'networkName' },
  { title: 'Email', field: 'email' }
]

const roleMap = {
  ADMIN: 'Admin',
  DM_USER: 'DM User',
  NETWORK_USER: 'Network User'
}

const getSortedUsersList = users => {
  if (users !== null) {
    users = users.map(item => ({
      ...item,
      fullName: item.firstName + ' ' + item.lastName,
      networkName: item.network.networkName
    }))

    users = users.sort((a, b) => (a.fullName > b.fullName ? 1 : b.fullName > a.fullName ? -1 : 0))
  } else {
    users = []
  }

  return users
}

export const Users = ({ getUsersList, users, history, usersLoading, userDeleting, confirmAndDeleteUser }) => {
  const { enqueueSnackbar } = useSnackbar()
  const sortedUsersList = getSortedUsersList(users)

  return (
    <Container maxWidth="xl">
      <Box width="100%" style={{ position: 'relative' }}>
        {(usersLoading || userDeleting) && <LoadingIndicator />}
        <MaterialTable
          title="Users"
          columns={columns}
          data={sortedUsersList}
          actions={[
            {
              icon: 'add_box',
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: () => history.push('/users/new')
            },
            {
              icon: 'save',
              tooltip: 'Edit User',
              onClick: (event, rowData) => {
                const state = {
                  profileId: rowData.userID,
                  firstName: rowData.firstName,
                  lastName: rowData.lastName,
                  email: rowData.email,
                  role: roleMap[rowData.userRole],
                  networkId: rowData.network,
                  seriesIds: []
                }

                history.push({
                  pathname: '/users/' + rowData.userID,
                  state
                })
              }
            },
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, rowData) => {
                confirmAndDeleteUser({
                  id: rowData.userID,
                  success: () => {
                    enqueueSnackbar('User deleted!', { variant: SNACKBAR_TYPE.SUCCESS })
                  },
                  fail: err => {
                    enqueueSnackbar(err.data.message, { variant: SNACKBAR_TYPE.ERROR })
                  }
                })
              }
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
            pageSizeOptions: [10, 30, 50, 100]
          }}
        />
      </Box>
    </Container>
  )
}

Users.propTypes = {
  history: PropTypes.object.isRequired,
  getUsersList: PropTypes.func.isRequired,
  usersLoading: PropTypes.bool,
  confirmAndDeleteUser: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  users: usersListSelector,
  usersLoading: usersListLoadingSelector,
  userDeleting: userDeletingSelector
})

const actions = {
  getUsersList,
  confirmAndDeleteUser
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(Users)
