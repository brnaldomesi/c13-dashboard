import React, { useEffect } from 'react'
import { getUsersList, usersListSelector } from 'redux/modules/profiles'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withLocationToPreference from 'hocs/withLocationToPreference'
import { withRouter } from 'react-router-dom'

const columns = [
  { title: 'Name', field: 'fullName' },
  { title: 'Network', field: 'networkName' },
  { title: 'Email', field: 'email' }
]

export const Users = ({ getUsersList, users, history }) => {
  useEffect(() => {
    if (users === null) {
      getUsersList()
    }
  }, [getUsersList, users])

  if (users !== null) {
    users = users.map(item => ({
      ...item,
      fullName: item.firstName + ' ' + item.lastName,
      networkName: item.network.networkName
    }))

    users = users.sort((a, b) => (a.fullName > b.fullName ? 1 : b.fullName > a.fullName ? -1 : 0))
  }

  return (
    <Container maxWidth="xl">
      <Box width="100%">
        <MaterialTable
          title="Users"
          columns={columns}
          data={users !== null ? users : []}
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
              onClick: (event, rowData) => alert('You saved ' + rowData.name)
            },
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, rowData) => alert('You want to delete ' + rowData.name)
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
  getUsersList: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  users: usersListSelector
})

const actions = {
  getUsersList
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  ),
  withLocationToPreference
)(Users)
